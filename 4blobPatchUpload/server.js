const express = require('express');
const path = require('path');
const app = express();

// 设置静态目录
app.use(express.static(path.join(__dirname, 'html')));



// 监听端口      
const PORT = 8080;
app.listen(PORT, () => {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
