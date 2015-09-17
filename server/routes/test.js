import koaRouter from 'koa-router';


var test = koaRouter();

var users = [1, 2, 3];

//router
test
    .param('user', function *(id, next) {
        this.user = users[id];
        if (!this.user) return this.status = 404;
        yield next;
    })
    .get('/', function *(next) {
        this.body = 'Hello World!';
    })
    .post('/users', function *(next) {
        this.body = 'Hello World!';
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