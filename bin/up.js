#!/usr/local/bin/node
// -*- mode: js -*-

var homeDir = require('os').homedir();
var config  = require(homeDir + '/.awwyeah.json');
var urls    = require('../scripts/urls');
var shelljs = require('shelljs');

var command = 'scripts/run.sh ' + config.dir;
shelljs.exec(command);



