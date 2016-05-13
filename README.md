gulp plugin for lithe
==========================

### 更新：

* 过滤 `publicdeps` 中定义的公共部分，抽取公共依赖，优化打包后文件
* 新增 `lithe` 打包压缩的优化工具 `precss.js/prejs.js` ，可在压缩时分析本地的一份 `m5d` 对照表，只对有变化的文件进行处理，大幅提高合并压缩效率
* 对 `css` 的压缩做了同样的 `md5` 处理
* `test` 目录下的 `gulpfile_example_inside.js` 是一个使用了 `precss.js/prejs.js` 的示例 `gulp` 配置文件


>lithe: [A browser-side script loader](https://github.com/litheModule/lithe)

```js
// example
var gulp = require('gulp');
var gulpLithe = require('gulp-lithe');
var litheConfig = require('./config.js');  // lithe config
gulp.task('test', function() {
    return gulp
        .src(['./src/app.js','./src/app2.js'])  // entry file
        .pipe(gulpLithe({
        	config:litheConfig  // lithe config
        }))
        .pipe(gulp.dest('./dist/'))
});
gulp.task('default',['test']);
```