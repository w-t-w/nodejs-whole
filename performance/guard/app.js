const http = require('http');
const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const PORT = 7777;

const leak = [];

const buffer = fs.readFileSync(TEMPLATE_DIR);

const server = http.createServer((request, response) => {
    leak.push(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
    // console.log(window.location.href);
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(buffer);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
    while (true) {

    }
});