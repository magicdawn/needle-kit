'use strict';

const Promise = require('bluebird');
const superagent = require('superagent');
const Request = superagent.Request;

// endAsync
Request.prototype.endAsync = Promise.promisify(Request.prototype.end);

// charset()
require('superagent-charset');

// exports
module.exports = superagent;