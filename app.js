var http = require ('http');
var httpproxy = require ('http-proxy');

var proxy = httpproxy.createProxyServer({

});

proxy.on ('error', function (err, req, res) {
	res.writeHead (500, {
		'Content-Type': 'text/plain'
	});
	res.end('Under Maintenance. Come back Soon');
});

var server = require ('http').createServer(function (req, res) {
	var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log("client ip:" + ip + ", host:" + host);

	switch (host) {
		case 'ayushverma.xyz':
		case 'www.ayushverma.xyz':
			proxy.web (req, res, {
				target: 'http://localhost:3000'});
			break;

		case 'ayushverma.me':
			proxy.web (req, res, {
				target: 'http://localhost:3001'});
			break;

		default:
			res.writeHead(200, {
				    'Content-Type': 'text/plain'
			});
			res.end('Welcome to My Website!');
	}



});

console.log("listening on port 80")
server.listen(8080);
