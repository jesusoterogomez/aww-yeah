var config  = require('./../lib/config');
var colors  = require('colors');
var path    = require('path');
var childProcess = require('child_process');

console.log(
    "This is not implemented yet. Here are the things that this script should handle:\n".yellow
        + " 1. check if setup is already complete, if not, run the steps that are not completed\n"
        + " 2. configure /etc/hosts so that dev.penneo.com is accessible\n"
        + " 3. check if projects are already cloned\n"
        + " 4. if not, clone them\n"
        + " 5. for every project, check if they have been bootstrapped\n"
        + " 6. if not, run bootstrap\n"
        + " 7. gateway should have sane defaults\n"
        + "NOTE: of course all mentioned steps should work on a mac as well\n".yellow
);

function isRequired(name) {
    if (steps[name] === false) {
        console.log(" %s %s", '\u2713'.green, name.blue);
        return;
    }
    console.log(" %s %s : \t trying to setup", '?'.yellow, name.blue);
};


function updateHostsFile() {
    var cmd = path.join(__dirname, '/../setup/hostip/update_hosts_file.sh');
    return new Promise((resolve, reject) => {
        var p = childProcess.spawn(cmd, [], {stdio: 'inherit'});
        // var exec = shelljs.exec(cmd, {silent: false});

        // console.log(colors.gray(exec.stdout) || colors.red(exec.stderr));
        // return exec.code === 0;
        p.on('exit', function (code) {
            resolve(code === 0);
        });
    });
}

function notImplemented(name) {
    console.log("Not implemented: %s".red, name);
}

var cfg = config.get();
var steps = cfg.setup;
var promise = Promise.resolve();

[
    'update-hosts-file',
    'vpn-info',
    'services'

].forEach(name => {

    // Is Required?
    promise = promise.then(() => {
        return isRequired(name);
    });

    switch (name) {
    case "update-hosts-file":
        promise = promise.then(updateHostsFile);
        break;
    case "vpn-info":
        promise = promise.then(() => {
            return notImplemented(name);
        })
        return;
    case "services":
        promise = promise.then(() => {
            return notImplemented(name);
        })
        return;
    default:
        console.log("Don't know how to setup %s".red, name);
        return;
    }

    promise.then(success => {
        cfg.setup[name] = false;
        config.save(cfg);
    });

});
