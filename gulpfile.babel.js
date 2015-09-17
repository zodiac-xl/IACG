import gulp         from 'gulp'
import gulpIf       from 'gulp-if'
import gutil        from 'gulp-util'
import nodemon         from 'gulp-nodemon'
import livereload         from 'gulp-livereload'

// default task
gulp.task('default', [
    'server'
]);


// server
gulp.task('server', function () {
    nodemon({
        script: 'index.js'
        , ext: 'html js'
        , env: {'NODE_ENV': 'development'}
        , ignore: ['ignored.js']
    }).on('start', function () {
        gutil.log('nodemon start!');
    }).on('restart', function () {
        livereload.reload();
        gutil.log('restarted!');
    })
});

