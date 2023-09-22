const http = require('http');
const path = require('path');
const fs = require('fs');

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const PORT = 7777;

const buffer = fs.readFileSync(TEMPLATE_DIR);

const server = http.createServer((request, response) => {
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(buffer);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});