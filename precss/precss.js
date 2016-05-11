/*
 * desc:判断CSS内部引用的图片文件是否有修改，若有则修改时间戳后缀，若无则使用旧的。
 * author:yanglang
 * time:2015.03.22
 */

var fs = require('fs');
var path = require('path');
var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
var imageLinkRegexp = /(?:background|background-image)\s*:\s*url\(['"]?([^)]*)['"]?\)/g;
var rootpath = process.cwd();

var through = require('through-gulp');

var main = function() {
    var stream = through(function(file, encoding, callback) {
        var md5FileName = path.join(rootpath,'.imageMD5.json'),md5FileJson = {},cssfile = '';
        if(fs.existsSync(md5FileName)){
            md5FileJson = JSON.parse(fs.readFileSync(md5FileName).toString());
        }else{
            fs.writeFileSync(md5FileName,JSON.stringify(md5FileJson));
        }
        var _this = this, alreadyImg = {};
        file.history.forEach(function(f) {
            if (fs.existsSync(f)) {
                var dir = path.dirname(f);
                cssfile = fs.readFileSync(f).toString().replace(commentRegExp, '');

                while ((result = imageLinkRegexp.exec(cssfile)) !== null) {
                    var imgName = RegExp.$1;
                    var imgFile = path.join(dir , imgName);
                    if(alreadyImg[imgFile])
                        continue;
                    if (fs.existsSync(imgFile)) {
                        var stat = fs.statSync(imgFile);
                        //获取图片文件修改时间
                        var mTime = stat.mtime.getTime();
                        //判断json文件里是否已记录此文件的修改时间
                        if(md5FileJson[imgFile]){
                            //判断旧修改时间与新修改时间是否相等
                            if(md5FileJson[imgFile] !== mTime){
                                //图片文件已改动 修改后缀为新修改时间
                                md5FileJson[imgFile] = mTime;
                            }
                        }else{
                            md5FileJson[imgFile] = mTime;
                        }
                        cssfile = cssfile.replace(new RegExp(imgName,'gm'),imgName+"?version="+mTime);
                        alreadyImg[imgFile] == true;
                    }
                }
            }
        });
        fs.writeFileSync(md5FileName,JSON.stringify(md5FileJson));
        file.contents = new Buffer(cssfile);
        _this.push(file);
        callback();

    }, function(callback) {
        callback();
    });

    return stream;
};

module.exports = main;
