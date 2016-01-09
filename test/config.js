(function (global, undef) {
    var isBrowser = !!(typeof window !== undef && global.navigator && global.document);
    var alias = {
        test:'src/alias'
    };
    var version = '0.0.57';
    var debug;
    var isdev;
    var baseurl;

    if(isBrowser) {
        debug = (/debug/).test(location.search);
        isdev = (/h5admin\.dev/).test(location.host);
        baseurl = isdev ? 'http://wap_front.dev.sina.cn/yuanyuan/h5admin/' : 'http://mjs.sinaimg.cn/wap/h5/dpool/h5/h5admin/';
    }
    var mod = {
        basepath: debug ? baseurl + 'js/' : baseurl + 'dist/',
        timestamp: version,
        alias: alias
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