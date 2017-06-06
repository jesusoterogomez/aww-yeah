#!/usr/bin/node
// -*- mode: js -*-


var homeDir = require('os').homedir();
var config  = require(homeDir + '/.aww.json');
var urls    = require('./urls');
var shelljs = require('shelljs');
var yesno   = require('yesno');

console.log("Not implemented..");
process.exit(-1);

yesno.ask( 'ARE YOU SURE THAT YOU WANT TO REMOVE ALL SERVICES ?', false, function(ok) {
  if(!ok) {
    process.exit(-1);
    return;
  }
  for (var name in urls) {
    var command = 'rm -r ' + config.dir + '/' + name;
    shelljs.exec(command);
  }
  process.exit(-1);
});
