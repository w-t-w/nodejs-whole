const fs = require('fs');
const path = require('path');
const http = require('http');

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const PORT = 7777;

const server = http.createServer((req, res) => {
    res.writeHead(200);
    fs.createReadStream(TEMPLATE_DIR, 'utf-8').pipe(res);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});