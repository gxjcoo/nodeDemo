const http = require('http');
const path = require('path');
const express = require('express');
const startUp =require('./jslib/startUp')
const monitor =require('./jslib/monitor')

//开始升级，执行shell脚本
startUp()
let app = express();
let server = http.createServer(app);
let io = require('socket.io')(server);
let file = './input.txt'
global.num = 0;
//有新的客户端连接时触发
io.on('connection', function (socket){
    //进行文件监听，将socket传至监听方法中，方便调用
    monitor(file,num)(socket)
    //发生错误时触发
    socket.on('error', function (err) {
        console.log(err);
    });
    //前段发送来的信息
    socket.on('send', function (res) {
      console.log(res);
  });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
server.listen(3030);






