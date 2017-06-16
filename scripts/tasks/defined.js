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
function pad(string, length) {
    var chars = Array(length).join(' ');
    return (string + chars).split('').reverse().join('').slice(-chars.length).split('').reverse().join(''); // really? 
}

if (service) {
    console.log(prettyJson.render(service, options));
} else {
    var all = services.getDefined(true);
    for (var id in all) {
        var service = all[id],
            name  = pad(service.name, 22),
            color = 'green',
            str   = '%s : %s [%s]',
            id    = pad(id, 10);
        if (!service.enabled) {
            color = 'gray';
            str   = str[color];
        } else {
            id    = id['green'];
        }
        console.log(str, id, name, service.environment);
    }
}

console.log();
