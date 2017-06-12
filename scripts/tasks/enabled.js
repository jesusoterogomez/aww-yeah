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

// @todo: copied, this should be moved to a common string utils file
function pad(string) {
    var chars = '          ';
    return (chars + string).slice(-chars.length);
}

if (service) {
    console.log(prettyJson.render(service, options));
} else {
    var all = services.getDefined();
    for (var id in all) {
        console.log('%s : %s', pad(id).green, all[id].name);
    }
}

console.log();
