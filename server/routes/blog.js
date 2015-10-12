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


import esformatter      from 'esformatter';//代码格式化
import dateFormat       from 'dateformat'


let blog = koaRouter();
let markdownPath = path.join(config.path.static, "markdown");
let postsPath = path.join(markdownPath, "posts");
let postsTreePath = path.join(markdownPath, "postsTree.js");
let postsTagsTreePath = path.join(markdownPath, "postsTagsTree.js");

var postsTree = require(postsTreePath).postsTree;
var postsTagsTree = require(postsTagsTreePath).postsTagsTree;




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


function updatePostsTree(postsTree) {
    var data = esformatter.format("module.exports=" + JSON.stringify({"postsTree": postsTree}));
    if (/\w/gm.test(data)) {
        fs.writeFile(postsTreePath, data, function (err) {
            if (err) console.log(err);
        });
    }else{
        console.log("postsTree is null do not allow save");
    }
}

function updatePostsTagsTree(postsTree) {
    var tagsTree = getPostsTagsTree(postsTree);
    var data = esformatter.format("module.exports=" + JSON.stringify({"postsTagsTree": tagsTree}));

    if (/\w/gm.test(tagsTree)) {
        fs.writeFile(postsTagsTreePath, data, function (err) {
            if (err) console.log(err);
        });
    }else{
        console.log("tagTree is null do not allow save");
    }
}

function getPostsTagsTree(postsTree) {
    var tagsTree = {};
    postsTree.forEach(function (item, index) {
        item.tags.forEach(function (tag, i) {
            if (!tagsTree[tag]) {
                tagsTree[tag] = [];
            }
            tagsTree[tag].push(item);
        })
    });
    return tagsTree
}


//router
blog

    .get('/blog', function *(next) {
        var tagName = this.query.tagName,
        pageIndex = Number(this.query.page || 0),
        pageSize = 10,
        newPostsTree = postsTree,
        tags = Object.keys(postsTagsTree),
        pageTitle = "Posts",
        totalSize,
        prePage,
        nextPage,
        tagQuery = "";
        if (tagName) {
            newPostsTree = postsTagsTree[tagName];
            pageTitle = tagName;
            tagQuery = "&tagName=" + tagName;
        }
        totalSize = newPostsTree.length;
        newPostsTree = splitArray(newPostsTree, pageSize);

        prePage = pageIndex ? ("/blog?page=" + (pageIndex - 1) + tagQuery) : "";
        nextPage = ((newPostsTree.length - 1) >= (pageIndex + 1)) ? ("/blog?page=" + (pageIndex + 1) + tagQuery) : "";
        if (postsTree) {
            this.body = this.fm.renderSync("pages/blog/index.ftl", _.extend({
                title: pageTitle,
                posts: newPostsTree[pageIndex],
                totalSize: totalSize,
                currentIndex: pageIndex,
                tags: tags,
                prePage: prePage,
                nextPage: nextPage
            },this.ftlCommon));
        } else {
            this.redirect('/404');
        }


    })
    .get('/blog/posts/:name', function *(next) {

        var fileName = this.params.name,
        tags = Object.keys(postsTagsTree),
        mdPath = path.join(postsPath, fileName + ".md");
        if (pathExists.sync(mdPath)) {
            var mdSource = encodeURIComponent(fs.readFileSync(mdPath).toString('utf-8')),
            thisNode = findNodeByFileName(fileName, postsTree);
            this.body = this.fm.renderSync("pages/blog/post.ftl",  _.extend({
                md: {
                    preNode: postsTree[thisNode.index * 1 - 1] || {},
                    nextNode: postsTree[thisNode.index * 1 + 1] || {},
                    tags: thisNode.tags,
                    source: mdSource,
                    name: fileName,
                    lastModifiedTime: thisNode.lastModifiedTime
                },
                tags: tags
            },this.ftlCommon));
        } else {
            this.redirect('/404');
        }
    })


    .del('/blog/posts', function *(next) {
        var thisNode,
        data = this.request.body,
        filePath = path.join(postsPath, data.name + ".md");

        thisNode = findNodeByFileName(data.name, postsTree);
        del(filePath);
        postsTree.splice(thisNode.index, 1);
        updatePostsTree(postsTree);

        return this.jsonResp(200, {message: "done"});
    })

    .post('/blog/posts', function *(next) {
        var thisNode,
        data = this.request.body,
        isNew = false,
        originalName = data["originalName"],
        name = data.name,
        mdSource = data.md,
        filePath,
        needRename = false;

        if (originalName != name) {
            needRename = true;
        }

        if (data.type == 0) {
            isNew = true;
        }

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
                "lastModifiedTime": dateFormat(new Date(), "yyyy-mm-dd h:MM:ss TT")
            });
        } else {
            thisNode = findNodeByFileName(originalName, postsTree);
            filePath = path.join(postsPath, originalName + ".md");
            fs.open(filePath, "a", "0666", function (e, fd) {
                fs.writeFile(filePath, mdSource, function () {
                    if (needRename) {//rename
                        fs.rename(filePath, path.join(postsPath, name + ".md"), function () {
                            del(filePath);
                        });
                    }

                    fs.closeSync(fd);
                });
            });
            thisNode["lastModifiedTime"] = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss TT");
            thisNode["name"] = name;
            postsTree[thisNode.index] = thisNode;
        }
        updatePostsTree(postsTree);

        return this.jsonResp(200, {message: "done"});
    })


    .post("/blog/posts/:name/tags/edit", function *(next) {
        var data = this.request.body,
        fileName = this.params.name,
        thisNode = findNodeByFileName(fileName, postsTree);
        console.log(fileName);
        console.log(thisNode);
        if(postsTree){
            console.log(111)
        }else{
            console.log(2222)
        }
        postsTree[thisNode.index].tags = JSON.parse(data.tags);
        updatePostsTree(postsTree);
        return this.jsonResp(200, {message: "done"});
    });


export
default blog;