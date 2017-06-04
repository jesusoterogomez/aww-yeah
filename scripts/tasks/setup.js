#!/usr/bin/node
// -*- mode: js -*-

var config = ('../lib/config')
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

