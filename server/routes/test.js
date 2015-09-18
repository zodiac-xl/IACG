import koaRouter        from 'koa-router';

let test = koaRouter();

let users = [1, 2, 3];


//router
test
    .get('/users', function *(next) {
        this.body="dsa";
    })
    .put('/users/:id', function *(next) {
        this.body = 'Hello World!';
    })
    .del('/users/:id', function *(next) {
        this.body = 'Hello World!';
        this.mongo.db('test').collection('hello').findOne({}, function (err, doc) {
            console.log(doc);
        });
        this.body = yield this.mongo.db("test").collection('hello').findOne();
    });

export
default test;