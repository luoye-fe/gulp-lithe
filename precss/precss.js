/*
 * desc:ÅÐ¶ÏCSSÄÚ²¿ÒýÓÃµÄÍ¼Æ¬ÎÄ¼þÊÇ·ñÓÐÐÞ¸Ä£¬ÈôÓÐÔòÐÞ¸ÄÊ±¼ä´Áºó×º£¬ÈôÎÞÔòÊ¹ÓÃ¾ÉµÄ¡£
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
                        //»ñÈ¡Í¼Æ¬ÎÄ¼þÐÞ¸ÄÊ±¼ä
                        var mTime = stat.mtime.getTime();
                        //ÅÐ¶ÏjsonÎÄ¼þÀïÊÇ·ñÒÑ¼ÇÂ¼´ËÎÄ¼þµÄÐÞ¸ÄÊ±¼ä
                        if(md5FileJson[imgFile]){
                            //ÅÐ¶Ï¾ÉÐÞ¸ÄÊ±¼äÓëÐÂÐÞ¸ÄÊ±¼äÊÇ·ñÏàµÈ
                            if(md5FileJson[imgFile] !== mTime){
                                //Í¼Æ¬ÎÄ¼þÒÑ¸Ä¶¯ ÐÞ¸Äºó×ºÎªÐÂÐÞ¸ÄÊ±¼ä
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
