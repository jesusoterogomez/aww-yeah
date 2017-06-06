#!/usr/bin/node
// -*- mode: js -*-

var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Service status')
    .argv;

var serviceId = args._[0] || '';
var service = services.validate(serviceId);

services.exec(serviceId, 'env');
