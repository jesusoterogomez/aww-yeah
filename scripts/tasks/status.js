var homeDir    = require('os').homedir();
var config     = require(homeDir + '/.aww.json');
var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Service status')
    .argv;

var serviceId = args._[0];

if (serviceId) {
    var service = services.validate(serviceId);
    services.displayStatus(service);
} else {
    var defined = services.getDefined();
    for (var id in defined) {
        services.displayStatus(defined[id], true);
    }
}

console.log();
