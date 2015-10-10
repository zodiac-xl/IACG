import fs               from 'fs';
import path             from 'path';
import _                from 'lodash';
import del              from 'del'

//
import gulp             from 'gulp'
import rename           from 'gulp-rename'
import gcallback        from 'gulp-callback'

//
import config           from 'config';

//
import koaRouter        from 'koa-router';

//
import pathExists       from 'path-exists';

//
import md2JekyllHtml     from 'md2JekyllHtml';


let blog = koaRouter();
let markdownPath = path.join(config.path.static, "markdown");
let postsPath = path.join(markdownPath, "posts");
let postsTreePath = path.join(markdownPath, "postsTree.js");


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
    _.forEach(postsTree, function (item, i) {
        if (item.name == name) {
            thisNode = item;
            thisNode.index = i;
            return false;
        }
    });
    return thisNode
}


function updatePostsTree(node) {

}

//router
blog

    .get('/blog', function *(next) {
        var postsTree = require(postsTreePath).postsTree,
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
        mdPath = path.join(postsPath, fileName + ".md");

        if (pathExists.sync(mdPath)) {
            var mdSource = encodeURIComponent(fs.readFileSync(mdPath).toString('utf-8')),
            postsTree = require(postsTreePath).postsTree,
            thisNode = findNodeByFileName(fileName, postsTree);

            this.body = this.fm.renderSync("pages/blog/post.ftl", {
                md: {
                    source: mdSource,
                    name: fileName,
                    lastModifiedTime: thisNode.lastModifiedTime
                }
            });
        } else {
            this.redirect('/404');
        }
    })

    .post('/blog/posts', function *(next) {
        var postsTree = require(postsTreePath).postsTree,
        thisNode,
        data = this.request.body,
        isNew = data["isNew"],
        originalName = data["originalName"],
        name = data.name,
        mdSource = data.md,
        filePath,
        needRename = false;

        if (originalName != name) {
            needRename = true;
        }
        console.log(isNew)

        if (isNew) {//new
            filePath = path.join(postsPath, name + ".md");
            fs.open(filePath, "a", "0666", function (e, fd) {
                fs.writeFile(filePath, mdSource, function () {
                    fs.closeSync(fd);
                });
            });

            postsTree.push({
                "name": name,
                "tags": [],
                "lastModifiedTime": new Date()
            });
        } else {
            thisNode = findNodeByFileName(originalName, postsTree);
            filePath = path.join(postsPath, originalName + ".md");
            fs.open(filePath, "a", "0666", function (e, fd) {
                fs.writeFile(filePath, mdSource, function () {
                    if (needRename) {//rename
                        fs.rename(filePath, path.join(postsPath, name + ".md"), function(){
                            console.log(1111);
                            del(filePath);
                        });
                        //gulp.src(filePath)
                        //    .pipe(rename(function (path) {
                        //        path.basename = name;
                        //    }))
                        //    .pipe(gulp.dest(postsPath))
                        //    .pipe(gcallback(function () {
                        //        console.log(filePath);
                        //        del(filePath);
                        //    }))
                    }

                    fs.closeSync(fd);
                });
            });
            thisNode["lastModifiedTime"] = new Date();
            thisNode["name"] = name;
            postsTree[thisNode.index] = thisNode;
        }

        return this.jsonResp(200, {message: "done"});
    });
export
default blog;