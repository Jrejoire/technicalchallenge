const http = require ('http');

const server = http.createServer((request, response) => {
	console.log(request.method);
	console.log(request.url);
	response.setHeader('Content-Type', 'text/html');
	response.end('<h1>Hello World</h1>');
});

server.listen(3000);