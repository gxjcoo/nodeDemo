module.exports =  function (filename,num) {
var fs = require('fs');
var readline = require('readline');
    //设置被监听文件
var logsArr = new Array();
let monitor = function(sk){
 sendHisLogs(filename, listenLogs,sk);
}
//进行文件监听
function sendHisLogs(filename,listenLogs,sk){
//创建文件监听流
  var rl = readline.createInterface({
    input: fs.createReadStream(filename,{
        enconding:'utf8'
    }),
    output: null,
    terminal: false  //这个参数很重要
  });
//读取文件
  rl.on('line', function(line) {
    if (line){
  //socket向前端推送已经存在的信息
  sk.send(line.toString());
  logsArr.push(line.toString());
    }//文件读取后
  }).on('close', function() {
    //进行监听
    listenLogs(filename,sk);
  });
}
//处理监听的数据，并打印出来（WebSocket）
var listenLogs = function(filePath,sk){

  console.log('日志监听中...');
  var fileOPFlag="a+";
  fs.open(filePath,fileOPFlag,function(error,fd){
      var buffer;
      fs.watchFile(filePath,{
         persistent: true,
         interval: 1000
      },function(curr, prev){
        //打印当前状态
        //console.log(curr);
          if(curr.mtime>prev.mtime){
             //文件内容有变化，那么通知相应的进程可以执行相关操作
            buffer = new Buffer(curr.size - prev.size);
            fs.read(fd,buffer,0,(curr.size - prev.size),prev.size,function(err, bytesRead, buffer){
             generateTxt(buffer.toString(),sk)
            });
          }else{
             console.log('不好意思，删除操作并不在监听范围');
          }
         });
          // 处理新增内容的地方
          function generateTxt(str,sk){
          var temp = str.split('\r\n');
          for(var s in temp){
            //打印变化内容
            //发送文件内容
            sk.send(temp[s])
            //检测进度
            if(temp[s]){
              num++
            }
          }
             //发送进度  
             console.log(num)
             sk.emit('progress',num)      
         }

  });
}

return monitor
    }
       
      
      