var services   = require('./../lib/services');

var args    = require('optimist')
    .usage('Manage a service')
    .argv;

var serviceIds = args._[0] || 'all';

if (serviceIds === 'all') {
    var all = services.getDefined();
    for (var id in all) {
        var docs = services.getDocs(all[id], true);
        if (!docs) {
            continue;
        }
        console.log('%s : %s', id, docs);
    }
} else {
    serviceIds.split(',').forEach((id, index) => {
        var service = services.validate(id);
        console.log('%s : %s', id, services.getDocs(service));
    });
}

console.log();
