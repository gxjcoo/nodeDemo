# sart
## npm install 
## pm2 start pm2.json
# log
##  2019.12.13
 - 过程是变 成造成监听和socket过分冗余，每次前段有新标签进行socket进行链接时都会再次监听文件，重新计算百分比。需要将progress写成global全局模式。并将监听和socket分开写