# lerna-vue-demo
模仿lerna管理vue3.0

### 初始化
```bash
npm i lerna -g

npm init -y

lerna init
```

### 创建包
```bash
lerna create my-vue -y
lerna create @my-vue/runtime-dom -y
lerna create @my-vue/runtime-core -y
lerna create @my-vue/compiler-dom -y
lerna create @my-vue/compiler-core -y
lerna create @my-vue/reactivity -y
lerna create @my-vue/shared -y
```

### 修改包结构
```bash
my-vue
  -src
    -index.js
  index.js
// ...其他包，如是

修改lerna.json，添加
  "useWorkspaces": true,
  "npmClient": "yarn",
  
修改根目录下package.json，添加
  "private": true,
  "workspaces": [
    "packages/*"
  ],
```

### 添加包依赖
```bash
// 给 my-vue 添加依赖
lerna add @my-vue/shared --scope=my-vue
lerna add @my-vue/runtime-dom --scope=my-vue
lerna add @my-vue/compiler-dom --scope=my-vue

// 给 @my-vue/runtime-dom 添加依赖
lerna add @my-vue/shared --scope=@my-vue/runtime-dom
lerna add @my-vue/runtime-core --scope=@my-vue/runtime-dom

// 给 @my-vue/compiler-dom 添加依赖
lerna add @my-vue/shared --scope=@my-vue/compiler-dom
lerna add @my-vue/compiler-core --scope=@my-vue/compiler-dom

// 给 @my-vue/reactivity 添加依赖
lerna add @my-vue/shared --scope=@my-vue/reactivity
```

### 所有子包更新依赖
```bash
lerna bootstrap
```

### 安装rollup
```base
cnpm i rollup rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-terser -D
cnpm i @babel/core @babel/preset-env -D
cnpm i jest -D
```

### 创建脚本目录，脚本文件，build.js，test.js
```bash
// build.js

const rollup = require('rollup') // 引入rollup
const terser = require('rollup-plugin-terser').terser // 压缩代码的插件
const commonjs = require('rollup-plugin-commonjs') // rollup默认支持es6的模块系统，需要支持commonjs的话需要这个插件
const babel = require('rollup-plugin-babel') // rollup的babel 插件
const args = process.argv[2] // 拿到 npm run build packName 中的packName

const projectPath = `./packages/${args}` // 子包所在的路径，相对process.cwd()

// 输入的文件配置
const inputOptions = {
  input: `${projectPath}/src/index.js`,
  plugins: [
    babel({ // babel文件的设置，会读取根目录的babel.config.js文件配置
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    commonjs(),
    terser()
  ]
}
// 输出的配置
const outputOptions = {
  file: `${projectPath}/lib/index.js`,
  format: 'esm',
  name: `${args}`
}

async function build () {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions) // inputOptions放在这里

  console.log(bundle.watchFiles) // an array of file names this bundle depends on

  await bundle.write(outputOptions) // outputOptions放在这里
}

build().then(() => {
  // do nothing
})


// test.js

const rawArgs = process.argv[2]      // 获取包名
const testFile = process.argv[3] || ''    // 获取测试文件名
const path = require('path')
let rootDir = path.resolve(__dirname, '../') // 绝对路径

rootDir = rootDir + '\\packages\\' + rawArgs // 拼出包的路径

const jestArgs = [
  '--runInBand',
  '--rootDir',
  rootDir,  // 传入包路径
  testFile ? `${testFile}.test.js` : '' // 指定的测试文件
] // jest 的一些配置

console.log(`\n===> running: jest ${jestArgs.join(' ')}`)

require('jest').run(jestArgs) // 执行
```

### 执行
```bash
// 执行
npm run build my-vue
npm run test my-vue sum
```

```bash

```
### 安装eslint
```bash
cnpm i eslint babel-eslint -D
```
