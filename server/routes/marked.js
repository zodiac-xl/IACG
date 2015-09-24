import fs               from 'fs';
import path             from 'path';

//
import config           from 'config';

//
import koaRouter        from 'koa-router';

//
import pathExists       from 'path-exists';

let marked = koaRouter();


//router
marked

    .get('/blog', function *(next) {
        var categorys = require(path.join(config.path.static, "markdown/categorys"));

        this.body = this.fm.renderSync("pages/blog/index.ftl", categorys);
    })

    .get('/blog/posts/:id', function *(next) {

        var mdPath = path.join(config.path.static, "markdown/posts/" + this.params.id + ".md");

        if (pathExists.sync(mdPath)) {
            var md = fs.readFileSync(mdPath).toString('utf-8');
            this.body = this.fm.renderSync("pages/blog/marked.ftl", {md: md});
        } else {
            this.redirect('/404');

        }
    });
export
default marked;