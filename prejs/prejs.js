/*
 * desc:��Ԥ�������жϺϲ�����ļ�����ļ�MD5�Ƿ��б仯�����У�����滻�����ޣ��򲻳󻯣����Ч��
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
                    var MD5 = md5.digest('hex');  //��ȡ�ļ���MD5ֵ
                }catch(e){
                    console.log('md5 file error:=============='+f);
                    throw new Error(e);
                }
                //�ж�json�ļ����Ƿ��Ѽ�¼���ļ���MD5
                if(md5FileJson[f]){
                    //�жϾ��ļ���MD5�����޸ĵ�MD5�Ƿ����
                    if(md5FileJson[f] !== MD5){
                        //�ļ��ѸĶ� �޸���MD5
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
