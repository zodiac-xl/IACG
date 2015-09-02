import fs from 'fs';
import path from 'path';
import config from 'config';

import koa from 'koa';
import proxy from 'koa-proxy';
import koaStatic from 'koa-static';

import mysql from 'mysql';

const app = koa();


// pass proxy to upstream
app.use(proxy(config.proxy));

// serve static files
app.use(koaStatic(config.path.static));


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zodiac',
    port: 3306
});

var selectSQL = 'select * from people limit 10';
pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);

    conn.query(selectSQL,function(err,rows){
        if (err) console.log(err);
        console.log("SELECT ==> ");
        for (var i in rows) {
            console.log(rows[i]);
        }
        conn.release();
    });
});


// get env
app.use(function*(next) {
    this.env = app.env;
    yield next;
});


// response
app.use(function *() {
    this.body = "zz";
    console.log(this.body);
});




export
default app;
