var log4js = require('log4js');

log4js.configure({
    appenders: {
        production: {
            type: 'file',
            filename: '/tmp/update.log',
            keepFileExt: true,
            maxLogSize: 10485760, 
            backups: 10
        }
    },
    categories: {
        default: { appenders: [ 'production' ], level: 'all' }
    }
});

var logger = log4js.getLogger();

module.exports=logger