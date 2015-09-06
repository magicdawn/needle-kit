var kit = module.exports;

/**
 * bootstrap
 * 
 * Promise & co
 */
var Promise = kit.Promise = global.Promise = require('bluebird');
var co = kit.co = require('co');

/**
 * Promise related
 */
kit.fs = require('./fs');

/**
 * load superagent related
 */
kit.request = require('./request');