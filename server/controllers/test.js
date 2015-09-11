var koa = require('koa');
var mongo = require('koa-mongo');

var app = koa();

app.use(mongo());
app.use(function* (next) {
    this.mongo.db('test').collection('users').findOne({}, function (err, doc) {
        console.log(doc);
    });

    this.body = yield this.mongo.db('test').collection('users').findOne();
});
app.listen(3000);
var test = {
    getHello: function*(next) {
        yield findDocuments();
    }
};

export
default test;