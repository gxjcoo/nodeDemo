const logger = require('./logConfig')
module.exports = function (file) {

    //Nodejs下引入模块child_process实现调用shell,execSync来调用shell脚本
    //const exec = require('child_process').execSync
    // console.info('调用shell脚本')
    // // 执行，test.sh脚本
    // exec('bash ' + file)

    const process = require('child_process');
    logger.info(new Date()+'正在调用shell脚本')
                var cmd = "bash -c 'cd ../file/ && chmod +x update.sh && ./update.sh'";
                process.exec(cmd,
                    function (error, stdout, stderr) {
                        logger.log(stdout)
                        if (error !== null) {
                            logger.error('未执行：exec error: ' + error);
                        }
                        if(stdout){
                            logger.info('执行成功')
                        }
                        if(stderr){
                            logger.warn('未执行成功')
                                }
                    })
}