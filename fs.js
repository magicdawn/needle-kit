'use strict';

/**
 * module dependencies
 */
const promiseify = require('promise.ify');

// promisify
const fs = promiseify.all(require('fs-extra'));

// patch
fs.existsAsync = function(p) {
  return new Promise(function(resolve, reject) {
    fs.exists(p, resolve);
  });
};

module.exports = fs;