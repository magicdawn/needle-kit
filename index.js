'use strict';
const kit = module.exports;

/**
 * bootstrap
 *
 * Promise & co
 */
const Promise = kit.Promise = require('bluebird');
const co = kit.co = require('co');

/**
 * Promise related
 */
kit.fs = require('./fs');

/**
 * load superagent related
 */
kit.request = require('./request');