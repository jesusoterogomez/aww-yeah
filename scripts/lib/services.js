var homeDir     = require('os').homedir();
var config      = require(homeDir + '/.awwyeah.json');
var definitions = require('./../../service-definitions');

var username = config.github.username;
var ssh      = config.github.ssh;

var services = {};
for (var id in definitions) {
    var definition = definitions[id];
    var url = // (ssh ? 'git@github.com:' : 'https://github.com/')
            'git@github.com:'
            + (definition.name.indexOf('/') > 0
               ? definition.name
               : username + '/' + definition.name)
            + '.git';
    services[id] = {
        id: id,
        name: definition.name,
        url: url,
        path: config.dir + '/' + definition.name
    };
}

module.exports = services;
