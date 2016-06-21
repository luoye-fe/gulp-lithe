/**
 * Created by zhangmike on 16/6/19.
 */
var lcconfig = {
	tmpPath: '../../../temp/js/',
	configFile: 'config.js',
	MD5File:'.jsUglifyPre.json',
	preload: [
		"lithe-localcache.js"
	],
	manifest:{
		prefix: "",
		expires: 1000 * 60 * 10
	}
};
module.exports = lcconfig