#!/usr/bin/node
// -*- mode: js -*-

var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Manage a service')
    .argv;

var serviceId = args._[0] || '',
    command   = args._[1] || 'up';

if (serviceId === 'all') {
    for (var id in services.getDefined()) {
        services.displayInfo(id);
        services.exec(id, command);
    }
} else {
    services.validate(serviceId);
    services.displayInfo(serviceId);
    services.exec(serviceId, command);
}

