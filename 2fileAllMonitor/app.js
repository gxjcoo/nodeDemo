const http = require('http');
const path = require('path');
const url = require('url');
const express = require('express');
let app = express();
let server = http.createServer(app);
//将静态文件目录设置为：项目根目录+/public
app.use(express.static(__dirname + '/public'));
// const io = require('socket.io')(server);
const io = require('socket.io')(server,{path:'/update'});
const startUp =require('./jslib/startUp')
const monitor =require('./jslib/monitor')
const logger = require('./jslib/logConfig')
//脚本文件和升级类型
let type;
//需要监控的进度文件
let file = './file/progress'
let uiUpdate = function(){
  startUp()
}

let bdpUpdate = function(){
  startUp()
  //有新的客户端连接时触发
  io.on('connection', function (socket){
logger.info("已建立连接");
      //进行文件监听，将socket传至监听方法中，方便调用
      monitor(file)(socket)
  });
}


app.get('/login/', function (req, res) {
  res.end(0);
});
app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//获取版本类型
app.get('/getType', function (req, res) {
  let {pathname,query} = url.parse(req.url,true);
  if(query.type == "a"){
logger.info('传入的type:'+query.type)

type = query.type
    logger.info("即将进行a升级,不需要后端")
    bdpUpdate()
  }
  if(query.type == "b"){
logger.info('传入的type:'+query.type)

type = query.type
    logger.info("即将进行b升级，需要后端返回数据")
    uiUpdate()
  }
  res.json({'type':type})
});
server.listen(23030);
logger.info("项目已启动")


