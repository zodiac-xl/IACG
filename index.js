require('babel/register');

var config = require('config');
var server = require('./server/index.js');

server.listen(config.port, function(){
  console.log('server is running at %s', config.port);
});
