const http = require('http');

const article = require('./data/article');

const PORT = 4000;

const server = http.createServer((request, response) => {
    response.writeHead(200, {'content-type': 'application/json'});
    response.end(JSON.stringify(article));
});

server.listen(PORT, () => {
    console.log(`The article server is running at http://localhost:${PORT}!`);
});

