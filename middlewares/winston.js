'use strict'

const winston = require('winston');
const { combine, timestamp, label, prettyPrint } = winston.format;
require('winston-daily-rotate-file');

function createLog(wenJianJiaName,logLevel,options) {
    let _default = {
        DailyRotateFileOptions:{
            filename: './logs/'+wenJianJiaName+'/'+wenJianJiaName+logLevel+'/'+wenJianJiaName+logLevel+'-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        },
        timestampOptions:{
            format: 'YYYY-MM-DD HH:mm:ss'
        },
        ConsoleOptions:{
            
        }
    };
    _default = Object.assign(_default,options);
    const {DailyRotateFileOptions,timestampOptions,ConsoleOptions} = _default;
    return winston.createLogger({
        level:logLevel,
        format: combine(
            timestamp(timestampOptions),
            prettyPrint(),
            winston.format.errors({ stack: true }), //加上这个就会自动加上stack
            winston.format.json() //json化报错信息
        ),
        transports: [
            new winston.transports.Console(ConsoleOptions),
            // new (winston.transports.Console)({ level: 'error' }), 这里可以定义打印什么水平的日志
            new (winston.transports.DailyRotateFile)(DailyRotateFileOptions)
        ],

    });
}
module.exports = createLog;

// uesr页面对应的日志：
const winston = require('winston');
require('winston-daily-rotate-file');
const createLog = require('./errBase');

const loggerInfo = createLog('user','info');
const loggerError = createLog('user','error');
loggerInfo.on('rotate', function(oldFilename, newFilename) {
    // do something fun
    console.log(oldFilename);
    console.log(newFilename);
});
//在这里你可以继续导出别的
module.exports = {
loggerInfo,
loggerError 
}