#gulp plugin for lithe

>lithe: [lithe A browser-side script loader](https://github.com/litheModule/lithe)

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


