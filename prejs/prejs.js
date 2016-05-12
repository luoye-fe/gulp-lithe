/*
 * desc:丑化预处理，先判断合并后的文件与旧文件MD5是否有变化，若有，则丑化替换，若无，则不丑化，提高效率
 * author:yanglang
 * time:2016.04.08
 */

var fs = require('fs');
var path = require('path');
var rootpath = process.cwd();
var crypto = require('crypto');
var through = require('through-gulp');

var main = function() {
    var stream = through(function(file, encoding, callback) {
        var md5FileName = path.join(rootpath,'.jsUglifyPre.json'),md5FileJson = {},jsfile = '';
        if(fs.existsSync(md5FileName)){
            md5FileJson = JSON.parse(fs.readFileSync(md5FileName).toString());
        }else{
            fs.writeFileSync(md5FileName,JSON.stringify(md5FileJson));
        }
        var _this = this, flag = false;

        file.history.forEach(function(f) {
            if (fs.existsSync(f)) {
                var dir = path.dirname(f);
                jsfile = fs.readFileSync(f).toString();
                try{
                    var md5 = crypto.createHash('md5').update(jsfile);
                    var MD5 = md5.digest('hex');  //获取文件的MD5值
                }catch(e){
                    console.log('md5 file error:=============='+f);
                    throw new Error(e);
                }
                //判断json文件里是否已记录此文件的MD5
                if(md5FileJson[f]){
                    //判断旧文件的MD5与新修改的MD5是否相等
                    if(md5FileJson[f] !== MD5){
                        //文件已改动 修改新MD5
                        md5FileJson[f] = MD5;
                        flag = true;
                    }
                }else{
                    flag = true;
                }
                md5FileJson[f] = MD5;
            }
        });
        fs.writeFileSync(md5FileName,JSON.stringify(md5FileJson));
        if(flag){
            file.contents = new Buffer(jsfile);
            _this.push(file);
        }

        callback();

    }, function(callback) {
        callback();
    });

    return stream;
};

module.exports = main;
