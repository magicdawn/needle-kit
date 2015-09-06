/**
 * module dependencies
 */
var Promise = require('bluebird');

// use Promise
var fs = module.exports = Promise.promisifyAll(require('fs'));

// patch
fs.existsAsync = function(p) {
  return new Promise(function(resolve, reject) {
    fs.exists(p, resolve);
  });
};

// fse ?