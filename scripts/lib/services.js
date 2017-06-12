var config  = require('./../lib/config');
var definitions  = require('./../../service-definitions');
var shelljs      = require('shelljs');
var childProcess = require('child_process'); // replace shelljs?
var prettyJson   = require('prettyjson');
var colors       = require('colors');
var prompt       = require('prompt-sync')();

var cfg      = config.get();
var username = cfg.github.username;
var ssh      = cfg.github.ssh;

// Shell commands for docker services using project runner
let dockerCommand = {
    up: 'project-runner/run.sh dev',
    start: 'project-runner/run.sh dev start',
    stop: 'project-runner/run.sh dev stop',
    isRunning: 'docker ps | grep {service-id}',
    env: 'project-runner/login.sh dev'
};

function getDefined(includeDisabled) {
    var all = {};
    for (var id in cfg.services) {
        // Filter out disabled services
        var enabled = !!cfg.services[id];
        if (!includeDisabled && !enabled) {
            continue;
        }
        var definition = definitions[id];
        var url = // (ssh ? 'git@github.com:' : 'https://github.com/')
                'git@github.com:'
                + (definition.name.indexOf('/') > 0
                   ? definition.name
                   : username + '/' + definition.name)
                + '.git';
        all[id] = Object.assign(definition, {
            id: id,
            url: url,
            path: cfg.dir + '/' + definition.name,
            enabled: enabled
        });
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

function getLogFileForProfile(service, profile) {
    // Get the profile is requested
    if (!service.logs || !service.logs.profiles) {
        console.log('Profile "%s" is not defined for service "%s"'.red, profile, service.id);
        process.exit(0);
    }
    var file = service.logs.profiles[profile];
    if (!file) {
        console.log('Profiles are not defined for service %s'.red, service.id);
        process.exit(0);
    }
    return service.path + '/' + file;
}

function getLogFile(service) {
    if (!service.logs) {
        console.log('Not implemented'.red);
        process.exit(0);
    }

    // Build a list of the files that can be monitored
    //
    var all = [];
    service.logs.directories.forEach(dir => {
        var path = service.path + '/' + dir + '/';
        var exec = shelljs.ls(path).forEach(file => {
            if (!file.endsWith('.log')) {
                return;
            }
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
    let raw = false;
    switch (command) {
    case 'up':
        cmd = service.commands && service.commands.up || dockerCommand.up;
        break;
    case 'start':
        cmd = service.commands && service.commands.start || dockerCommand.start;
        break;
    case 'stop':
        // @todo: need to find a better way to determine whether the cmd is raw
        // or not
        if (service.commands && service.commands.stop) {
            raw = true;
            cmd = service.commands.stop;
        } else {
            cmd = dockerCommand.stop;
        }
        break;
    case 'env':
        cmd = service.commands && service.commands.env || dockerCommand.env;
        break;
    case 'monitor':
        // @todo: move this to a separate file (lib/monitor.js)
        var file = options.profile ? getLogFileForProfile(service, options.profile) : getLogFile(service);
        console.log(file);
        console.log();
        cmd = 'tail -f ' + file;
        var parts = cmd.split(' ');
        var command = parts.shift();
        var args = parts;
        var p = childProcess.spawn(command, args);
        var color = options.color || 'gray';
        var name = ('[ ' + service.id.toUpperCase() + ' ] ').bold;
        p.stdout.on('data', (data) => {
            process.stdout.write(`${data}`.replace(/^/g, name)[color]);
        });
        p.stderr.on('data', (data) => {
            process.stdout.write(`${data}`.red);
        });
        return;

        break;
    case '':
        // intentional break-through
    default:
        console.log('Invalid command specified "%s". Valid commands are up, start, stop, env, monitor.'.yellow, command);
        return;
    }

    if (raw) {
        console.log(colors.gray(cmd));
        var exec = shelljs.exec(cmd, {silent: true});
        console.log(colors.gray(exec.stdout || exec.stderr));
    } else {
        console.log(cmd.gray);
        console.log();
        var parts = cmd.split(' ');
        var command = parts.shift();
        var args = parts;
        var p = childProcess.spawn(command, args, {
            cwd: service.path,
            stdio: 'inherit'
            // detached: true
        });
    }
}

function displayInfo(id, brief) {
    var service = get(id);
    var info = {
        name: service.name
    };
    if (!brief) {
        info = Object.assign(info, service);
    }
    console.log(prettyJson.render(info));
    console.log('');
}

function displayStatus(service, silent) {
    var id = service.id;
    var command = service.commands && service.commands.isRunning || dockerCommand.isRunning;
    command = command.replace('{service-id}', id);
    var exec = shelljs.exec(command, {silent: true});
    if (!silent) {
        console.log(command.gray);
        console.log();
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

function getDocs(service, ignoreMissing) {
    if (!service.port || !service.docs || !service.docs.publicUrl) {
        return null;
    }

    return 'http://dev.penneo.com:' + service.port + service.docs.publicUrl;
}

module.exports = {
    getDefined: getDefined,
    exec: exec,
    validate: validate,
    displayInfo: displayInfo,
    displayStatus: displayStatus,
    getDocs: getDocs
}
