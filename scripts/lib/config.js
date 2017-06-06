var homeDir = require('os').homedir();
var fs      = require('fs');
var path    = require('path');
var prompt  = require('prompt-sync')();

var file    = homeDir + '/.aww.json';
var backupFile = file + '.bkp';

// logging
var colors     = require('colors');

function getFilePath() {
    return file;
}

var config;
function get(noCache) {
    if (config && !noCache) {
        return config;
    }
    try {
        config = require(file);
    } catch (err) {
        console.log("Aww shucks! Dot file missing at: %s\n".yellow, file);
        console.log("Creating a new .aww.json file now..\n".yellow);
        return init();
    }
    return config;
}

function populateTemplate(content) {
    return content.match(/{{.*}}/g).reduce((acc, holder) => {
        var value = prompt('Please specify a value for ' + holder + ': ');
        return acc.replace(holder, value);
    }, content);
}

function init() {
    var template = fs.readFileSync(path.join(__dirname, '/../../templates/dotaww.json')).toString();
    var userConfig = populateTemplate(template);
    save(JSON.parse(userConfig));
    return userConfig;
}

function _copyFile(source, target) {
    var source;
    try {
        source = fs.readFileSync(source);
    } catch(err) {
        console.log('File %s does not exist!\n'.red, source);
        throw err;
    }
    try {
        fs.writeFileSync(target, source);
    } catch (err) {
        console.log('Unexpected error when trying to copy %s to $s!\n'.red, source, target);
        throw err;
    }
}
function save(config) {
    // Backup
    if (fs.existsSync(file)) {
        console.log('Backing up previously configured configuration file %s to %s'.gray, file, backupFile);
        _copyFile(file, backupFile);
    }

    // @todo: move log calls outside the lib
    try {
        fs.writeFileSync(file, JSON.stringify(config, null, '    '));
    } catch (err) {
        console.log("Error while trying to save configuration file\n".red);
        console.log(err);
        return false;
    }
    console.log("Configuration file updated: %s\n".gray, file);
    return true;
}

function revert() {
    _copyFile(backupFile, file);
    // Remove backup file after reverting
    fs.unlink(backupFile);
}

module.exports = {
    init: init,
    get: get,
    getFilePath: getFilePath,
    save: save,
    revert: revert
};
