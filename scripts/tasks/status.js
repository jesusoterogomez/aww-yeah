#!/usr/local/bin/node
// -*- mode: js -*-

var homeDir    = require('os').homedir();
var config     = require(homeDir + '/.awwyeah.json');
var services   = require('./../lib/services');
var shelljs    = require('shelljs');
var prettyJson = require('prettyjson');
var colors     = require('colors/safe');

var args    = require('optimist')
    .usage('Service status')
    .argv;

var serviceId = args._[0];

// @todo: move this to a common place. lib/services.js ?
if (serviceId && !services[serviceId]) {
  console.log("Service '" + serviceId + "' doesn't exist! Configured services are: " + Object.keys(services) + "\n");
  process.exit(0);
}

var pad = '          ';
var silent = !serviceId;

for (var id in services) {
  if (serviceId && serviceId !== id) {
    continue;
  }
  var exec = shelljs.exec('docker ps | grep ' + id, {silent: true});
  if (!silent) {
    console.log(colors.gray(exec.stdout));
  }
  var paddedId = (pad + id).slice(-pad.length);
  console.log(paddedId + ":\t" + (exec.code === 0 ? colors.green("\u2713") : colors.red("\u2718")));
}
console.log();
