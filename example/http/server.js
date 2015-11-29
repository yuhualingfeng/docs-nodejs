var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){

	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write('Hello World!');
	res.end();


});

server.listen(4000);

/*require('http').createServer(function(req,res){

	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello World!');

}).listen(4000);*/