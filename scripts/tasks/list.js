#!/usr/bin/node
// -*- mode: js -*-

var services   = require('./../lib/services');
var prettyJson = require('prettyjson');

var options = {
  noColor: false
};

console.log(prettyJson.render(services.getDefined(), options));
