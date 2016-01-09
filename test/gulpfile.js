var gulp = require('gulp');

var gulpLithe = require('../app.js');

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
