#!/usr/bin/node
// -*- mode: js -*-

var config     = require('./../lib/config');
var colors     = require('colors');
var prettyJson = require('prettyjson');

var args    = require('optimist')
    .usage('Manage configuration')
    .argv;

var command = args._[0] || 'show';

var file = config.getFilePath().blue;

function displayConfig(noCache) {
    console.log("Reading configuration file from %s:\n", file);
    console.log(prettyJson.render(config.get(noCache)));
}

switch (command) {
case 'show':
    displayConfig()
    break;
case 'init':
    config.init();
    displayConfig(true);
    break;
case 'revert':
    config.revert();
    displayConfig(true);
    break;
case 'test':
    var c = config.get();
    c.testing = 'this is a test config';
    config.save(c);
    displayConfig(true);
    break;
}

