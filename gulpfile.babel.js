import path             from 'path';
import fs               from 'fs';
import _                from 'lodash';

//blog
import walk             from 'walk';
import esformatter      from 'esformatter';//代码格式化

import gulp             from 'gulp'
import gulpIf           from 'gulp-if'
import gutil            from 'gulp-util'
import nodemon          from 'gulp-nodemon'
import livereload       from 'gulp-livereload'
import runSequence      from 'run-sequence'
import rename           from 'gulp-rename'

//postcss
import postcss          from 'gulp-postcss'
import autoprefixer     from 'autoprefixer'//css 添加浏览器前缀 auto
import mqpacker         from 'css-mqpacker'//Pack same CSS media query rules into one media query rule.
import csswring         from 'csswring'//Minify CSS file with source maps.
import nested           from 'postcss-nested'//支持嵌套
import sourcemaps       from 'gulp-sourcemaps'
import del              from 'del'

//
import config           from 'config';

let __root = (dir) => path.join("./", dir);
let __md = (dir) =>path.join(config.path.static, "markdown/" + dir);

// default task
gulp.task('default', [
    'server'
]);

// default task
gulp.task('default', [
    'server'
]);

// blog
gulp.task('blog', function (cb) {
    runSequence.use(gulp)(
        'updatePostTree',
        cb
    )
});


gulp.task('clean:posts', function (cb) {
    del(__md("posts")).then(function () {
        cb();
    });
});


gulp.task('copy', function (cb) {
    var sourcePath = __md("blog"),
    destPath = __md("posts"),
    walker = walk.walk(sourcePath, {followLinks: false});

    fs.mkdirSync(destPath);

    walker.on("file", function (root, fileStat, next) {
        var filepath = path.resolve(root, fileStat.name);
        fs.readFile(filepath, function (err, data) {
            if (err) throw err;
            var fileName = path.basename(filepath);
            fs.open(path.join(__md("posts"), fileName), "a", "0666", function (e, fd) {
                fs.writeFile(path.join(__md("posts"), fileName), data, function () {
                    fs.closeSync(fd);
                    next();
                });
            });

        });
    }).on('end', function () {
        cb();
    })
});


gulp.task('updatePostTree', function (cb) {
    var mdPath = __md("posts");
    fs.readdir(mdPath, function (err, filepaths) {
        if (err) throw err;

        var postsTree = require(__md("postsTree.js")).postsTree,
            newPostsTree = [];
        _.forEach(filepaths, function (filepath, i) {
            var fileName = path.basename(filepath);


            function findNodeByFileName(fileName) {
                var thisNode = {};
                _.forEach(postsTree, function (item) {
                    if (item.fileName == fileName) {
                        thisNode = item;
                        return false;
                    }
                });
                return thisNode
            }

            var thisNode = findNodeByFileName(fileName);

            thisNode = {
                id: thisNode.id || postsTree.length,
                name: fileName.replace(/\.md/, ""),
                tags: thisNode.tags || [],
                lastModifiedTime: thisNode.lastModifiedTime || new Date()
            };
            newPostsTree.push(thisNode);
        });
        fs.writeFile(__md("postsTree.js"), esformatter.format("module.exports=" + JSON.stringify({"postsTree": postsTree})), function (err) {
            if (err) throw err;
            cb()
        });

    });


});


gulp.task('css', function () {
    runSequence.use(gulp)(
        "clean:postCss",
        "postCss"
    )
});
//
gulp.task('postCss', function () {
    var processors = [
        nested,
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker
        //csswring
    ];
    return gulp.src(__root("develop/**/*.scss"))
        .pipe(rename(function (path) {
            path.extname = ".css"
        }))
        //.pipe(sourcemaps.init())
        .pipe(postcss(processors))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(__root("deploy")));
});

//
gulp.task('clean:postCss', function (cb) {
    del(__root("deploy/postcss")).then(function () {
        cb();
    });
});


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

