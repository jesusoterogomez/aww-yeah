var homeDir  = require('os').homedir();
var config   = require(homeDir + '/.bolt.json');
var services = require('./services');

var username = config.github.username;
var ssh      = config.github.ssh;

var urls = [];
for (var id in services) {
  var service = services[id];
  urls[service.name] =
    // (ssh ? 'git@github.com:' : 'https://github.com/')
    'git@github.com:'
    + (service.name.indexOf('/') > 0
       ? service.name
       : username + '/' + service.name)
    + '.git';
}

module.exports = urls;
