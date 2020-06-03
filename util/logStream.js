//Log system configuration
const fs = require('fs-extra');
const debug = require('debug')('logStream');
const path = require('path');
const rfs = require('rotating-file-stream');

var logStream;

function getLogSystem(){
  if(process.env.LOG_DIR_NAME){
    debug("Dir provided, creating rfs...");
    thePath = path.join('./', process.env.LOG_DIR_NAME);
    debug("Path:" + thePath)
    logStream = rfs.createStream('logfile.log', {
      size: '10M',
      interval: '7d',
      compress: 'gzip',
      path: thePath
    });
    debug("Log Stream Created!");
  }
}

module.exports = function () {
  getLogSystem();
  return logStream;
};
  //Create an async function and call it right away}
