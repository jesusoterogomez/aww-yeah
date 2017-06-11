var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Manage a service')
    .argv;

var command    = args._[0] || 'up';
var serviceIds = args._[1] || '';

if (serviceIds === 'all') {
    for (var id in services.getDefined()) {
        services.displayInfo(id, true);
        services.exec(id, command);
    }
} else {
    serviceIds.split(',').forEach((serviceId, index) => {
        services.validate(serviceId);
        services.displayInfo(serviceId);
        services.exec(serviceId, command);
    });
}

