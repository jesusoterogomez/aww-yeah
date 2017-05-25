#!/usr/local/bin/node
// -*- mode: js -*-

var homeDir = require('os').homedir();
var config  = require(homeDir + '/.bolt.json');
var urls    = require('./urls');
var shelljs = require('shelljs');

// Clone repos
for (var name in urls) {
  var command = 'git clone --recursive ' + urls[name] + ' ' + config.dir + '/' + name;
  // console.log(command);
  shelljs.exec(command);
}
