/*
 * 内部gulp文件示例，需根据实际情况修改
 */


var gulp = require('gulp');
var gulpLithe = require('../app.js');
var litheConfig = require('./src/js/config.js'); // lithe config

// 分析md5的变化
var cssImageLink = gulpLithe.precss;
var jsUglifyPre = gulpLithe.prejs;

var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var gulpUtil = require('gulp-util');
var minifycss = require('gulp-minify-css');


gulp.task('lithe', function() {
    return gulp
        .src(['./src/js/conf/**/*.js']) // entry file
        .pipe(gulpLithe({
            config: litheConfig // lithe config
        }))
        .pipe(jsUglifyPre()) //丑化预处理，先判断合并后的文件与旧文件MD5是否有变化，若有，则丑化替换，若无，则不丑化，提高效率
        .pipe(uglify({
            mangle: {
                except: ['require', '$']
            }
        }).on('error', gulpUtil.log))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', function() {
    return gulp.src('./src/css/**/*.css')
        .pipe(cssImageLink())
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('default', ['lithe', 'styles']);
