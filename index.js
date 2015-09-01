var kit = exports = module.exports;

/**
 * bootstrap the kit
 */
require('./bootstrap');

/**
 * load superagent related
 */
kit.request = require('./request');