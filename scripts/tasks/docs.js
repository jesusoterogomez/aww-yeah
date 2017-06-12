var services = require('./../lib/services');
var p        = require('child_process'); // replace shelljs?
var path    = require('path');

var args    = require('optimist')
    .usage('Generate public documentation')
    .argv;

var serviceId = args._[0] || 'all';

if (serviceId === 'all') {

    console.log('Here is an overview of the available documentation (public for users). Specify the service to get the actual documentation\n'.yellow);

    var all = services.getDefined();
    for (var id in all) {
        var docs = services.getDocs(all[id], true);
        if (!docs) {
            continue;
        }
        console.log('%s : %s', id, docs);
    }
} else {
    var service = services.validate(serviceId);
    var link = services.getDocs(service);
    var cmd = path.join(__dirname, '/show-documentation.sh');
    p.spawn(cmd, [link], {stdio: 'inherit'});
}

console.log();
