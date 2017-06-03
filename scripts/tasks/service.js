#!/usr/bin/node
// -*- mode: js -*-

var homeDir    = require('os').homedir();
var config     = require(homeDir + '/.awwyeah.json');
var services   = require('./../lib/services');
var shelljs    = require('shelljs');
var prettyJson = require('prettyjson');

var args    = require('optimist')
    .usage('Manage a service')
    // .default('service-id', 'all')
    // .default('command', 'start')
    .argv;

// var serviceId = args['service-id'],
//     command   = args['command'];

var serviceId = args._[0],
    command   = args._[1];

// console.log(services);

// Validate commands
switch (command) {
case 'start':
case 'stop':
    break;
default:
    command = '';
}

// Run the services
for (var id in services) {
    if (serviceId !== 'all' && serviceId !== id) {
        continue;
    }

    var service = services[id];

    // Display service info
    console.log('');
    console.log(prettyJson.render(service));
    console.log('');

    // Run service
    var cmd = service.path + '/project-runner/run.sh dev ' + command;
    console.log(cmd);
    shelljs.exec(cmd);
}


// shelljs.exec(command);
