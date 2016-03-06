'use strict';

const Promise = require('bluebird');
const superagent = require('superagent');
const Request = superagent.Request;

// endAsync
Request.prototype.endAsync = Promise.promisify(Request.prototype.end);

// add charset()
require('superagent-charset')(superagent);

// exports
module.exports = superagent;