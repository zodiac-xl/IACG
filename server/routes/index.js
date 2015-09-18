import koaRouter        from 'koa-router';

let index = koaRouter();


//router
index
    .get('/', function *(next) {
        this.body = this.fm.renderSync("pages/index.ftl", {});
    });
export
default index;