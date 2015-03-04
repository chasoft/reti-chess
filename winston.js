'use strict';

/** 
 * Winston logger
 */

var path = require('path');
var winston = require('winston');
 
winston.add(winston.transports.File, {
  filename: path.join(__dirname, 'logs/games.log'),
  handleExceptions: true,
  exitOnError: false,
  json: false
});
winston.remove(winston.transports.Console);
winston.handleExceptions(new winston.transports.Console());
winston.exitOnError = false;

module.exports = winston;