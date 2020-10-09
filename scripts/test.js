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
