#!/usr/bin/node
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
  console.log("Service '%s' doesn't exist! Configured services are: %s\n", serviceId, Object.keys(services));
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
  console.log('%s :\t %s',
              (pad + id).slice(-pad.length), // padded service id
              (exec.code === 0 ? colors.green('\u2713') : colors.red('\u2718'))
             );
}
console.log();
