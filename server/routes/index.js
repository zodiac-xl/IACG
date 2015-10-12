import koaRouter        from 'koa-router';
import _                from 'lodash';

let index = koaRouter();


//router
index
    .get('/', function *(next) {
        this.body = this.fm.renderSync("index.ftl",  _.extend({},this.ftlCommon));
    });
export
default index;