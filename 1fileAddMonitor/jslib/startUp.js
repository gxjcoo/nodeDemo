module.exports =  function () {
//Nodejs下引入模块child_process实现调用shell,execSync来调用shell脚本
const exec = require('child_process').execSync
    console.info('调用shell脚本')
    // 执行，test.sh脚本
    exec('bash extract.sh')
}
   
  
  