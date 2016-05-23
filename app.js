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
    if (config.publicdeps) {
        var deps = Object.keys(config.publicdeps);
        litheOptions.publicdeps = tool.uniq(
            deps.map(function(current){
                if (current.lastIndexOf(".js") < 0) {
                    return current + ".js";
                }else {
                    return current;
                }
            })
        );
    }

    var stream = through(function(file, encoding, callback) {
        var requires;
        var _this = this;

        file.history.forEach(function(f) {
            requires = tool.findJsAllrequires(f, [], config.filter);
        });
        requires.push(file.history[0]);

        requires = requires.map(function(c) {
            return c.split(Path.sep).join('/');
        });

        if (litheOptions.publicdeps) {
            litheOptions.publicdeps.forEach(function(pd) {
                requires.forEach(function(rd) {
                    if (rd.replace(pd, "").length != rd.length) {
                        requires.splice(requires.indexOf(rd), 1);
                    }
                });
            });
        }

        var result = '';
        (function() {
            var arg = arguments;
            if (requires.length == 0) {
                file.contents = new Buffer(result);
                _this.push(file);
                callback();
                return;
            }
            fs.readFile(requires[0], 'utf-8', function(err, data) {
                result += data;
                requires = requires.slice(1);
                arg.callee();
            });
        })()

    }, function(callback) {
        callback();
    });

    return stream;
};

module.exports = main;
exports.prejs = module.exports.prejs = require('./prejs/prejs.js');
exports.precss = module.exports.precss= require('./precss/precss.js');
