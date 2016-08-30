'use strict';

/**
 * Module dependencies
 */

const pify = require('promise.ify');
const fs = pify.all(require('fs-extra'));

// patch
fs.existsAsync = function(p) {
  return new Promise(function(resolve, reject) {
    fs.exists(p, resolve);
  });
};

module.exports = fs;