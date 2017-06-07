#!/usr/bin/node
// -*- mode: js -*-

var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Enable logging')
    .argv;

var serviceId = args._[0] || '';
var service = services.validate(serviceId);

services.exec(serviceId, 'monitor');
