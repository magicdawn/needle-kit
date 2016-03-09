'use strict';

const superagent = require('superagent');
const Request = superagent.Request;
const promiseify = require('promise.ify');

// endAsync
Request.prototype.endAsync = promiseify(Request.prototype.end);

// add charset()
require('superagent-charset')(superagent);

// exports
module.exports = superagent;