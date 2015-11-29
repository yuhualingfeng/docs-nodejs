require('http').createServer(function(req,res){

	res.writeHead(200,{'Content-Type':'text/plain'});

	res.write(req.method);
	console.log(req.headers);
	// res.write(util.inspect(req.headers));
	res.end(req.url);


}).listen(4000);