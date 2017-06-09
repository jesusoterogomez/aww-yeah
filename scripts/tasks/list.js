var services   = require('./../lib/services');
var prettyJson = require('prettyjson');

var args    = require('optimist')
    .usage('List pre-defined services')
    .argv;

var options = {
  noColor: false
};

var serviceId = args._[0] || '';

var service = serviceId && services.validate(serviceId);

console.log(prettyJson.render(service || services.getDefined(), options));
