var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');


// default task
gulp.task('default', [
    'server'
]);


// server
gulp.task('server', function () {
    nodemon({
        script: 'server.js'
        , ext: 'html js'
        , env: { 'NODE_ENV': 'development' }
        , ignore: ['ignored.js']
    }).on('start', function () {
        gutil.log('nodemon start!');
    }).on('restart', function () {
        livereload.reload();
        gutil.log('restarted!');
    })
});

