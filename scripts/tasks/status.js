var homeDir    = require('os').homedir();
var config     = require(homeDir + '/.aww.json');
var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Service status')
    .argv;

var serviceId = args._[0];

if (serviceId) {
    services.validate(serviceId);
    services.displayStatus(serviceId);
} else {
    for (var id in services.getDefined()) {
        services.displayStatus(id, true);
    }
}

console.log();
