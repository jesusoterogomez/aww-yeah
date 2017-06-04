#!/usr/bin/node
// -*- mode: js -*-

var homeDir    = require('os').homedir();
var config     = require(homeDir + '/.awwyeah.json');
var services   = require('./../lib/services');
var prettyJson = require('prettyjson');

var options = {
  noColor: false
};

console.log(prettyJson.render(services.getDefined(), options));
