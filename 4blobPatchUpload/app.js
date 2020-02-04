const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
// 设置静态目录
app.use(express.static(path.join(__dirname, 'html')));

app.post('/upLoad', function (req, res) {
  const buf = []
  let count = 0
// 接收数据事件，会多次触发，chunk的格式为nodejs的Butter
req.on('data', (chunk) => {
  buf.push(chunk)
  count += chunk.length
})
// 数据接收结束保存图片
req.on('end', () => {
   // 创建流（stream）
   const ws = fs.createWriteStream(path.resolve(__dirname, 'uploadFile', 'file'))
   // 将暂存好的Buffer写入流
   buf.forEach(i => {
     ws.write(i)
   })
   ws.end()
})
res.end('{msg:"success"}', 'utf8')
  });




let downFile = null;
fs.open('./uploadFile/12.xls','r',(err, fd) => {
    fs.fstat(fd,(err,stat)=>{
        var len = stat.size;  //检测文件长度
        var buf = new Buffer(len);
        fs.read(fd,buf,0,len,0,(err,bw,buf)=>{
          downFile = buf
        })
    });
});


  app.get('/downLoad', function (req, res) {
            console.log(downFile);
  res.end(downFile)


    });
  

// 监听端口      
const PORT = 8080;
app.listen(PORT, () => {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
