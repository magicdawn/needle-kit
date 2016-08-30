'use strict';

/**
 * Module dependencies
 */

const superagent = require('superagent');
const pify = require('promise.ify');

// add charset()
require('superagent-charset')(superagent);

// exports
module.exports = superagent;