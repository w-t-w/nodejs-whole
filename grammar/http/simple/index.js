const http = require('http');

const PORT = 7777;

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello nodejs!');
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});