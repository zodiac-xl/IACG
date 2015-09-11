import koaRouter from 'koa-router';


var test = koaRouter();
//router
test
    .get('/', function *(next) {
        this.mongo.db('test').collection('hello').findOne({}, function (err, doc) {
            console.log(doc);
        });
        this.body = yield this.mongo.db("test").collection('hello').findOne();
    })
    .post('/users', function *(next) {
        this.body = 'Hello World!';
    })
    .put('/users/:id', function *(next) {
        this.body = 'Hello World!';
    })
    .del('/users/:id', function *(next) {
        this.body = 'Hello World!';
    });

export
default test;