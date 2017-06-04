#!/usr/bin/node
// -*- mode: js -*-

var config  = require('./../lib/config');
var colors  = require('colors');

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


function updateHostsFile() {
    return console.log("Not implemented".red);
}
function notImplemented(name) {
    console.log("Not implemented: %s".red, name);
}

var steps = config.get().setup;
for(var name in steps) {
    if (steps[name] === false) {
        console.log("%s is already setup", name.blue);
        continue;
    }
    switch (name) {
    case "update-hosts-file":
        notImplemented(name);
        break;
    case "vpn-info":
        notImplemented(name);
        break;
    case "clone-projects":
        notImplemented(name);
        break;
    case "bootstrap":
        notImplemented(name);
        break;
    default:
        console.log("Don't know how to setup %s".red, name);
    }
}
