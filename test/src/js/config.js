(function (global, undef) {
    var isBrowser = !!(typeof window !== undef && global.navigator && global.document);
    var alias = {
        test:'src/alias'
    };
    var version = '0.0.57';
    var debug;
    var isdev;
    var baseurl,
        publicpath;

    if(isBrowser) {
        debug = (/debug/).test(location.search);
        isdev = (/h5admin\.dev/).test(location.host);
        baseurl = isdev ? 'http://wap_front.dev.sina.cn/yuanyuan/h5admin/' : 'http://mjs.sinaimg.cn/wap/h5/dpool/h5/h5admin/';
        publicpath = ""; //定义为公共模块路径
    }
    var mod = {
        basepath: debug ? baseurl + '/test/src/js/' : baseurl + '/test/dist/js/',
        timestamp: version,
        alias: alias,
        publicpath : debug ? baseurl + 'js/' : baseurl + 'dist/',
        publicdeps : {
            "vendors/zepto.js" : {
                "vendors/zepto/v1/zepto.js" : []
            },
            "vendors/fastclick.js" : {
                "vendors/fastclick/fastclick.js" : []
            }
        },
        localcache:true,
        preload:[],
        manifest:{},
        timestamp:'1.2.2'
    };
    if(global.define && isBrowser) {
        define('config', function (require, exports, module) {
            return mod;
        });
    } else {
        mod.basepath = __dirname;
        module.exports = mod;
    }
})(this);