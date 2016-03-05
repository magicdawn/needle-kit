'use strict';

/**
 * module dependencies
 */
const Promise = require('bluebird');

// promisify
const fs = Promise.promisifyAll(require('fs-extra'));

// patch
fs.existsAsync = function(p) {
  return new Promise(function(resolve, reject) {
    fs.exists(p, resolve);
  });
};

module.exports = fs;