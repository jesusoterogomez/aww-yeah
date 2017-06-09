var services   = require('./../lib/services');
var colors     = require('colors');
var optimist   = require('optimist');

var args    = optimist
    .usage(
        'Monitor one or more services by showing the logs: \n'.grey +
            'Usage:   '.grey +
            ' $0 SERVICE[,SERVICE] [PROFILE] \n'.blue +
            'Example: '.grey +
            ' $0 sign,auth default'.blue
          )
    .demand(1)
    .argv;

var serviceIds = args._[0] || [],
    profile    = args._[1];

// Monitor each service
//
serviceIds.split(',').forEach((serviceId, index) => {
    services.validate(serviceId);
    services.exec(serviceId, 'monitor', {
        color: ['gray', 'magenta', 'cyan', 'green', 'blue'][index],
        profile: profile
    });
});
