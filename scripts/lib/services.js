var homeDir      = require('os').homedir();
var config       = require(homeDir + '/.aww.json');
var definitions  = require('./../../service-definitions');
var shelljs      = require('shelljs');
var childProcess = require('child_process'); // replace shelljs?
var prettyJson   = require('prettyjson');
var colors       = require('colors');
var prompt       = require('prompt-sync')();

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
            path: config.dir + '/' + definition.name,
            logs: definition.dir && definition.dir.logs || []
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

function getLogFile(service) {
    if (service.logs.length === 0) {
        console.log('Not implemented'.red);
        process.exit(0);
    }

    // Build a list of the files that can be monitored
    //
    var all = [];
    service.logs.forEach(dir => {
        var path = service.path + '/' + dir + '/';
        var exec = shelljs.ls(path).forEach(file => {
            all.push(path + '/' + file);
        });
    });

    // Print all options for the log file
    //
    all.forEach((file, index) => {
        // console.log(file);
        var parts = file.split('/');
        console.log(" %s : %s ", pad(index + 1).cyan, parts[parts.length-1].gray );
    });

    // Get the file that we want to monitor
    //
    console.log();
    var selection = prompt('Which file do you want to monitor? '.cyan);
    console.log();
    return all[selection - 1];
}

function exec(id, command, options) {
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
    case 'monitor':
        var file = getLogFile(service);
        console.log(file);
        console.log();
        cmd = 'tail -f ' + file;
        var parts = cmd.split(' ');
        var command = parts.shift();
        var args = parts;
        var p = childProcess.spawn(command, args);
        var color = options.color || 'gray';
        p.stdout.on('data', (data) => {
            process.stdout.write(`${data}`[color]);
        });
        p.stderr.on('data', (data) => {
            process.stdout.write(`${data}`.red);
        });
        return;
    case '':
        // intentional break-through
    default:
        console.log('Invalid command specified "%s". Valid commands are up, start, stop, env, monitor.'.yellow, command);
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
    console.log('%s :\t %s',
                pad(id), // padded service id
                (exec.code === 0 ? colors.green('\u2713') : colors.red('\u2718'))
               );
}

function pad(string) {
    var chars = '          ';
    return (chars + string).slice(-chars.length);
}

module.exports = {
    getDefined: getDefined,
    exec: exec,
    validate: validate,
    displayInfo: displayInfo,
    displayStatus: displayStatus

}
