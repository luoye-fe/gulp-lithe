/*
 * desc:gulp plugin for lithe
 * author:luoye https://github.com/luoye-fe/gulp-lithe.git
 * time:2015.01.09
 */

var fs = require('fs');

var lithe = require('lithe');
var tool = lithe.tool;
var litheOptions = tool.options;
var Path = require('path');
var rootpath = process.cwd();

var through = require('through-gulp');

var main = function(options) {
    var options = options || {
        confing: {
            basepath: rootpath,
            timestamp: '',
            alias: {}
        }
    };
    var config = options.config;

    if (config.basepath) {
        litheOptions.basepath = Path.resolve(rootpath, config.basepath);
    }
    if (config.alias) {
        litheOptions.alias = config.alias;
    }

    var stream = through(function(file, encoding, callback) {

        var requires;
        file.history.forEach(function(f) {
            requires = tool.findJsAllrequires(f, [], config.filter);
        });

        requires.push(file.history[0]);

        var result = '';
        for (var i = 0; i < requires.length; i++) {
            result += fs.readFileSync(requires[i], 'utf-8');
        }

        file.contents = new Buffer(result);

        this.push(file);

        callback();
    }, function(callback) {
        callback();
    });

    return stream;
};

module.exports = main;
