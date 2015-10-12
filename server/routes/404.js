import fs               from 'fs';
import path             from 'path';

//
import config           from 'config';

//
import koaRouter        from 'koa-router';

let notFound = koaRouter();


//router
notFound
    .get('/404', function *(next) {
        this.body = this.fm.renderSync("404.ftl", {});
    });
export
default notFound;