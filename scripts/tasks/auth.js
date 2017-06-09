var homeDir  = require('os').homedir();
var config   = require(homeDir + '/.aww.json');
var services = require('./../lib/services');
var Penneo   = require('penneo-js-sdk');
var prompt   = require('prompt');
var write    = require('write');

var uri = 'dev.penneo.com:9999';
var tokenFile = homeDir + '/.penneo-auth-token-local';

// Prompt input
//
var input = [{
    name: 'username',
    default: 'test',
    required: true
}, {
    name: 'password',
    default: 'test',
    hidden: true,
    replace: '*',
    conform: function (value) {
        return true;
    }
}, {
    name: 'uri',
    default: 'http://dev.penneo.com:8002/app_dev.php/api/v1/'
}];


prompt.start();

console.log('Please enter your classic credentials to generate an authentication token:');
prompt.get(input, function (err, result) {
    var authApi = new Penneo({
        url: result.uri,
        auth: 'JWT'
    });

    return authApi.post('/token/password', {
        username: result.username,
        password: result.password
    }).then(function(res) {
        write(tokenFile, res.data, function(err) {
            if (err) {
                errorHandler(err);
                return;
            }
            console.log("\n");
            console.log('Token saved in ' + tokenFile + ':');
            console.log("\n");
            console.log(res.data);
        });
    }).catch(errorHandler);
});

function errorHandler(res) {
    if (res.error) {
        console.log(res.error);
    } else {
        console.log(res);
    }
}
