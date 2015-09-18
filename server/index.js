//内置方法
import fs from 'fs';
import path from 'path';

//配置
import config from 'config';
import routers from 'config';

//工具
import requireDir from 'require-dir';
import _ from 'lodash';

//服务
import koa from 'koa';
import koaProxy from 'koa-proxy';
import koaStatic from 'koa-static';
import mongo from 'koa-mongo';
import Freemarker from 'freemarker.js';


const app = koa();
const routes = requireDir('./routes');

let fm = new Freemarker({
    viewRoot: config.path.view,
    options: {
        /** for fmpp */
    }
});


app.use(mongo({
    host: 'localhost',
    port: 9998,
    db: 'test',
    max: 100,
    min: 1,
    timeout: 30000,
    log: false
}));

// pass proxy to upstream
app.use(koaProxy(config.proxy));

// serve static files
app.use(koaStatic(path.dirname(__dirname)));

// get env
app.use(function*(next) {
    this.env = app.env;
    yield next;
});

// check ajax request
app.use(function*(next) {
    const requestWith = this.get('X-Requested-With');
    this.ajax = (requestWith == 'XMLHttpRequest');
    yield next;
});

//404 and error
app.use(function *(next) {
    if (this.status == "404") {
        this.body = 'Hello World 404';
    } else {
        try {
            yield next;
        } catch (err) {
            this.status = err.status || 500;
            this.body = err.message;
            console.log("error:--------");
            console.log(err.status);
            console.log(err.message);
            this.app.emit('error', err, this);
        }
    }
});


// freemarker
app.use(function*(next) {
    this.fm = fm;
    yield next;
});

//router
_.forIn(routes, function (route, key) {
    app.use(route.routes())
        .use(route.allowedMethods());
});

export
default app;
