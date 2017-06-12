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
    var all = services.getDefined(true);
    for (var id in all) {
        var service = all[id],
            name  = service.name,
            color = 'green',
            str   = '%s : %s',
            id    = pad(id);
        if (!service.enabled) {
            color = 'gray';
            str   = str[color];
        } else {
            id    = id['green'];
        }
        console.log(str, id, name);
    }
}

console.log();
