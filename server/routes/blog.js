import fs               from 'fs';
import path             from 'path';
import _                from 'lodash';

//
import gulp             from 'gulp'
import rename           from 'gulp-rename'

//
import config           from 'config';

//
import koaRouter        from 'koa-router';

//
import pathExists       from 'path-exists';

//
import md2JekyllHtml     from 'md2JekyllHtml';


let blog = koaRouter();


function splitArray(arr, size) {
    var result = [];
    _.forEach(arr, function (item, index) {
        if (index % size == 0) {
            result.push([]);
        }
        result[result.length - 1].push(item);
    });
    return result;
}


function findNodeByFileName(name, postsTree) {
    var thisNode = {};
    _.forEach(postsTree, function (item) {
        if (item.name == name) {
            thisNode = item;
            return false;
        }
    });
    return thisNode
}

function findNodeById(id, postsTree) {
    var thisNode = {};
    _.forEach(postsTree, function (item) {
        if (item.id == id) {
            thisNode = item;
            return false;
        }
    });
    return thisNode
}

//router
blog

    .get('/blog', function *(next) {
        var postsTree = require(path.join(config.path.static, "markdown/postsTree")).postsTree,
        pageIndex = Number(this.query.page || 0),
        pageSize = 10,
        newPostsTree = splitArray(postsTree, pageSize);

        this.body = this.fm.renderSync("pages/blog/index.ftl", {
            posts: newPostsTree[pageIndex],
            totalSize: postsTree.length,
            currentIndex: pageIndex,
            preIndex: pageIndex ? (pageIndex - 1) : "false",
            nextIndex: ((newPostsTree.length - 1) >= (pageIndex + 1)) ? (pageIndex + 1) : "false"
        });

    })

    .get('/blog/posts/:name', function *(next) {

        var fileName = this.params.name,
        mdPath = path.join(config.path.static, "markdown/posts/" + fileName + ".md");

        if (pathExists.sync(mdPath)) {
            var mdSource = encodeURIComponent(fs.readFileSync(mdPath).toString('utf-8'));

            var postsTree = require(path.join(config.path.static, "markdown/postsTree.js")).postsTree,
            thisNode = findNodeByFileName(fileName, postsTree);

            this.body = this.fm.renderSync("pages/blog/marked.ftl", {
                md: {
                    source: mdSource,
                    id: thisNode.id,
                    name: fileName,
                    lastModifiedTime: thisNode.lastModifiedTime
                }
            });
        } else {
            this.redirect('/404');
        }
    })

    .post('/blog/posts', function *(next) {
        var postsTree = require(path.join(config.path.static, "markdown/postsTree.js")).postsTree,
        thisNode,
        data = this.request.body,
        id = data.id,
        name = data.name,
        mdSource = data.md,
        filePath;

        if (id == 0) {//new

        } else {
            thisNode = findNodeById(id, postsTree);
            filePath = path.join(config.path.static, "markdown/posts/" + thisNode.name + ".md");
            fs.open(filePath, "a", "0666", function (e, fd) {
                fs.writeFile(filePath, mdSource, function () {

                    if (thisNode.name != name) {//rename
                        gulp.src(filePath)
                            .pipe(rename(function (path) {
                                path.basename = name;
                            }))
                            .pipe(gulp.dest(config.path.static));
                    }

                    fs.closeSync(fd);
                });
            });
        }

        return this.jsonResp(200, {message: "done"});
    });
export
default blog;