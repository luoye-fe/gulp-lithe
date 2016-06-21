var gulp = require('gulp');

var gulpLithe = require('./app.js');

var litheConfig = require('./test/src/js/config.js');  // lithe config

var localcacheConfig = require('./test/src/js/localcacheconfig.js');

var cssImageLink = gulpLithe.precss;

var jsUglifyPre = gulpLithe.prejs;

var localcache = gulpLithe.localcache;

var uglify = require("gulp-uglify");

var concat = require('gulp-concat');

var gulpUtil = require('gulp-util');

var del = require('del');

var minifycss = require('gulp-minify-css');

/*gulp.task('test', function() {
    return gulp
        .src(['./test/src/app.js','./test/src/app2.js'])  // entry file
        .pipe(gulpLithe({
        	config:litheConfig  // lithe config
        }))
        .pipe(gulp.dest('./test/dist/js/'))
});*/

gulp.task('litheconcat', function() {
    return gulp
        .src(['./test/src/js/conf/**/*.js'])  // entry file
        .pipe(gulpLithe({
            config:litheConfig  // lithe config
        }))
        .pipe(gulp.dest('./test/temp/js/conf'))
});

gulp.task('concat', function() {
    return gulp.src(['./test/src/js/lithe.js'])
        .pipe(gulp.dest('./test/dist/js/'));
});

gulp.task('uglify',['litheconcat','concat'], function() {
    return gulp.src(['./test/temp/js/**/*.js'])
        .pipe(jsUglifyPre())//丑化预处理，先判断合并后的文件与旧文件MD5是否有变化，若有，则丑化替换，若无，则不丑化，提高效率
        .pipe(uglify({
            mangle: {
                except: ['require','$']
            }
        }).on('error', gulpUtil.log))
        .pipe(gulp.dest('./test/dist/js/'));
});

gulp.task('localcache', ['uglify'], function() {
    return gulp.src('./test/src/js/conf/**/*')
        .pipe(localcache(litheConfig, localcacheConfig))
        .pipe(gulp.dest('./test/temp/dist/'));
});

gulp.task('uglifylithe',['litheconcat','concat'], function() {
    return gulp.src(['./test/src/js/lithe.js']).pipe(uglify({
        mangle: {
            except: ['require']
        }
    })).pipe(gulp.dest('./test/dist/js/'));
});

gulp.task('uglifyconfig',['litheconcat','concat', 'localcache'], function() {
    return gulp.src(['./test/temp/js/config.js']).pipe(uglify()).
    pipe(localcache(litheConfig, localcacheConfig)).
    pipe(gulp.dest('./test/dist/js/'));
});

gulp.task('moveimages', function() {
    return gulp.src('./test/src/images/**/*')
        .pipe(gulp.dest('./test/dist/images'));
});



gulp.task('styles', ['moveimages'], function() {
    return gulp.src('./test/src/css/**/*.css')
        .pipe(cssImageLink())
        .pipe(minifycss())
        .pipe(gulp.dest('./test/dist/css'));
});

gulp.task('cleantemp',['uglify','uglifyconfig','uglifylithe','styles','moveimages'], function(cb) {
    return del(['./test/temp'],{force:true});
});

gulp.task('default',['litheconcat', 'uglify', 'uglifylithe', 'uglifyconfig', 'localcache', 'styles', 'cleantemp']);
//gulp.task('default',['test']);