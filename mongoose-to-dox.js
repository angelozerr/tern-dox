var fs = require('fs'),
  dox = require('dox'),
  exec = require('child_process').exec,
  docs = require('./docs');

// ----------------------------------------------------------------------------
// INITALIZE
// ----------------------------------------------------------------------------
// All source files for the api generation


var path = "D:/_Projects/git/mongoose/lib"
var apiClasses = [];

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
        
          var f = file.substring(path.length, file.length);
          var filename = f.substring(1, f.length-3);
          results.push({tag: filename, path:"./lib" + f});
          next();
        }
      });
    })();
  });
};

walk(path, function(err, results) {
  if (err) throw err;
  console.log(results);
  
  var apiClasses = results;
//Output directory
  var outputDirectory = "./docs/sphinx-docs/source/api-generated"

  // ----------------------------------------------------------------------------
  // PROCESS Driver API
  // ----------------------------------------------------------------------------
  docs.renderAPIDocs(outputDirectory, apiClasses, "D:/_Projects/git/mongoose/");
  
});

console.log(apiClasses);
//var apiClasses = [];
//
//
//var apiClasses = [
//    {tag:"browser", path:"./lib/browser.js"}
//];

