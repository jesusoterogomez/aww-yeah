#!/usr/local/bin/node
// -*- mode: js -*-

var homeDir  = require('os').homedir();
var config   = require(homeDir + '/.awwyeah.json');
var services = require('./../penneo/services');
var shelljs  = require('shelljs');

// Clone repos
for (var id in services) {
  var service = services[id];
  var command = 'mkdir -p ' + service.name + ' && git clone --recursive ' + service.name + ' ' + config.dir + '/' + service.name;
  // console.log(command);
  shelljs.exec(command);
}
