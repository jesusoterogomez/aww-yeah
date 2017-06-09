var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Monitor one or more services by showing the logs')
    .argv;

var serviceIds = args._[0] || [];

// Monitor each service
//
serviceIds.split(',').forEach((serviceId, index) => {
  services.validate(serviceId);
  services.exec(serviceId, 'monitor', {
    color: ['gray', 'magenta', 'cyan', 'green', 'blue'][index]
  });
});
