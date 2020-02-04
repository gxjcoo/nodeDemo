const logger = require('./logConfig')

module.exports = function (filename) {
  logger.info('正在进行文件监听')
  var fs = require('fs');
  var readline = require('readline');
  //设置被监听文件
  global.keyWord = [1, 2, 3, 4, 5, 0];
  let tempnum = num = 0;
  let monitor = function (sk) {
    setInterval(()=>{
    sendHisLogs(filename, sk);
    },2000)
  }
  //进行文件监听
  function sendHisLogs(filename , sk) {
    //创建文件监听流
    var rl = readline.createInterface({
      input: fs.createReadStream(filename, {
        enconding: 'utf8'
      }),
      output: null,
      terminal: false //这个参数很重要
    });
    //读取文件
    rl.on('line', function (line) {
      if (line) {
        if(line<=5&&line>=1){
          num =Math.floor(line*99/5) 
        }
        if(line == 0){
        num = 100
        }
      } //文件读取后
    }).on('close', function () {
      //socket向前端推送已经存在的信息
      //发送进度  
      if(tempnum!=num){
        logger.info('当前进度:' + num)
        sk.emit('progress', num)
        tempnum=num
      }
      //    listenLogs(filename,sk);
    });
  }
  //处理监听的数据，并打印出来（WebSocket）
  // var listenLogs = function(filePath,sk){
  //   logger.info('升级日志监听中...');
  //   var fileOPFlag="a+";
  //   fs.open(filePath,fileOPFlag,function(error,fd){
  //       var buffer;
  //       fs.watchFile(filePath,{
  //          persistent: true,
  //          interval: 1000
  //       },function(curr, prev){
  //         //打印当前状态
  //         // logger.info(curr);
  //           // if(curr.mtime>prev.mtime){
  //              //文件内容有变化，那么通知相应的进程可以执行相关操作
  //             buffer = new Buffer(curr.size);
  //             fs.read(fd,buffer,0,(curr.size),0,function(err, bytesRead, buffer){
  //               logger.info("文件内容："+buffer.toString())
  //              generateTxt(buffer.toString(),sk)
  //             });
  //          });
  //           // 处理新增内容的地方
  //           function generateTxt(str,sk){
  //           var temp = str.split('\r\n');
  //           for(var s in temp){
  //             //发送文件内容
  //             sk.send(temp[s])
  //             //检测进度
  //             keyWord.forEach((item,index) => {
  //               if(temp[s].indexOf(item)!=-1){
  //                 num =num<(index+1)/keyWord.length*100? (index+1)/keyWord.length*100:num;
  //               }
  //             });
  //           }
  //              //发送进度  
  //              logger.info('当前进度:'+num)
  //              sk.emit('progress',num)      
  //          }
  //   });
  // }
  return monitor
}