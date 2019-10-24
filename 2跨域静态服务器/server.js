const request = require('request');
const express = require('express');
const path = require('path');

const app = express();

// 代理配置
const proxyTable = {  
    '/api': {
        //后台地址
        target: 'http://localhost/3030' 
    }
};
app.use(function(req, res,next) {  
    const url = req.url;  
    if (req.method == 'OPTIONS') {      
      console.log('options_url: ', url); 
      
       //  设置cors 跨域
      // res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
      // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
      // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

      // 设置 cookie
      // res.header("Access-Control-Allow-Credentials", true);
      
      res.status(200).send('OK');     
      return;
    } 
    // console.log('req_url: ', url);
    next();
});

// 设置静态目录
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', function(req, res) {  
      const url = req.url; 
      const proxy = Object.keys(proxyTable);  
      let not_found = true; 
      for (let index = 0; index < proxy.length; index++) {    
          const k = proxy[index];    
          const i = url.indexOf(k);   
          if (i >= 0) {     
              not_found = false;     
              const element = proxyTable[k];      
              const newUrl = element.target + url.slice(i+k.length);
              req.pipe(request({url: newUrl, timeout: 60000},(err)=>{
                  if(err){          
                      console.log('error_url: ', err.code,url);           
                      res.status(500).send('');
                  }     
              })).pipe(res);      
              break;
          } 
      }  
      if(not_found) {    
          console.log('not_found_url: ', url);
          res.status(404).send('Not found');
      } else {    
          console.log('proxy_url: ', url);
      }
});

// 监听端口      
const PORT = 8080;
app.listen(PORT, () => {  
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
