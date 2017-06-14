var config   = require('./../lib/config');
var services = require('./../lib/services');

var args    = require('optimist')
    .usage('Enable a pre-defined service')
    .argv;

var enable      = args._[0] === 'enable';
var serviceIds  = args._[1];
var environment = args._[2] || 'local';

if (!serviceIds) {
    console.log('No services defined to be %s. Options are: %s\n'.red,  enable ? 'enabled' : 'disabled', Object.keys(config.get().services));
    process.exit(0);
}

serviceIds.split(',').forEach((serviceId, index) => {
  var c = config.get();
  if (typeof c.services[serviceId] === 'undefined' ) {
    console.log('Service %s is not defined.'.red, serviceId);
    process.exit(0);
  }
  if (c.services[serviceId] === enable) {
    console.log('Service %s is already %s.\n'.blue, serviceId, enable ? 'enabled' : 'disabled');
    return;
  }

  var service = c.services[serviceId];

  service.enable = enable;
  service.environment = environment;

  config.save(c);
  var color = enable ? 'green' : 'yellow';
  console.log('Service %s is %s.\n'[color], serviceId, enable ? 'enabled' : 'disabled');
});
