var services = require('./../lib/services');
var p        = require('child_process'); // replace shelljs?
var path     = require('path');

var args    = require('optimist')
    .usage('Show README')
    .argv;

var serviceId = args._[0];

var service = services.validate(serviceId);
var cmd = path.join(__dirname, '/show-readme.sh');
console.log(cmd);
p.spawn(cmd, [], {cwd: service.path, stdio: 'inherit'});

console.log();
