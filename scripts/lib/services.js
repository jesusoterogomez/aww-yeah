var homeDir      = require('os').homedir();
var config       = require(homeDir + '/.awwyeah.json');
var definitions  = require('./../../service-definitions');
var shelljs      = require('shelljs');
var childProcess = require('child_process'); // replace shelljs?
var prettyJson   = require('prettyjson');
var colors       = require('colors');

var username = config.github.username;
var ssh      = config.github.ssh;

// Shell commands for docker services using project runner
let dockerCommand = {
    up: 'project-runner/run.sh dev',
    start: 'project-runner/run.sh dev start',
    stop: 'project-runner/run.sh dev stop',
    isRunning: 'docker ps | grep {service-id}',
    env: 'project-runner/login.sh dev'
};

function getDefined() {
    var all = {};
    for (var id in config.services) {
        // Filter out disabled services
        if (!config.services[id]) {
            continue;
        }
        var definition = definitions[id];
        var url = // (ssh ? 'git@github.com:' : 'https://github.com/')
                'git@github.com:'
                + (definition.name.indexOf('/') > 0
                   ? definition.name
                   : username + '/' + definition.name)
                + '.git';
        all[id] = {
            id: id,
            name: definition.name,
            url: url,
            path: config.dir + '/' + definition.name
        };
    }
    return all;
}

function validate(id) {
    let service = getDefined()[id];
    if (!id || !service) {
        error = "Service \"%s\" doesn't exist!";
        error += ' Configured services are: %s\n';
        console.log(error.yellow, id, Object.keys(getDefined()));
        process.exit(0);
    }

    return service;
}

function get(id) {
    let service = getDefined()[id];
    if (!service) {
        throw new Error("Service doesn't exist" + id);
    }
    return service;
}

function exec(id, command) {
    let service = get(id);
    let cmd;
    switch (command) {
    case 'up':
        cmd = service.path + "/" + dockerCommand.up;
        break;
    case 'start':
        cmd = service.path + "/" + dockerCommand.start;
        break;
    case 'stop':
        cmd = service.path + "/" + dockerCommand.stop;
        break;
    case 'env':
        cmd = service.path + "/" + dockerCommand.env;
        var parts = cmd.split(' ');
        var command = parts.shift();
        var args = parts;
        childProcess.spawn(command, args, {stdio: 'inherit'});
        return;
        break;
    case '':
        console.log('What do I do with this service? Please specify a command'.yellow);
        return;
    default:
        console.log('Invalid command specified "%s". Valid commands are up, start, stop.'.yellow, command);
        return;
    }

    console.log(colors.gray(cmd));
    var exec = shelljs.exec(cmd, {silent: true});
    console.log(colors.gray(exec.stdout || exec.stderr));
}

function displayInfo(id) {
    console.log(prettyJson.render(get(id)));
    console.log('');
}

function displayStatus(id, silent) {
    var command = dockerCommand.isRunning.replace('{service-id}', id);
    var exec = shelljs.exec(command, {silent: true});
    if (!silent) {
        console.log(colors.gray(exec.stdout));
    }
    var pad = '          ';
    console.log('%s :\t %s',
                (pad + id).slice(-pad.length), // padded service id
                (exec.code === 0 ? colors.green('\u2713') : colors.red('\u2718'))
               );
}

module.exports = {
    getDefined: getDefined,
    exec: exec,
    validate: validate,
    displayInfo: displayInfo,
    displayStatus: displayStatus

}
