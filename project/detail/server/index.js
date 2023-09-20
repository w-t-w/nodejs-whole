const path = require('path');
const fs = require('fs');
const protobuf = require('protocol-buffers');

const {RPC} = require('./lib');
const columns = require('../data/columns');

const PORT = 7777;

const PROTO_DIR = path.resolve(process.cwd(), './project/detail/proto/columns.proto');

const {DetailRequest, DetailResponse} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const rpc = RPC(DetailResponse, DetailRequest);

const server = rpc.createServer((request, response) => {
    const {body: {column_id}} = request;
    console.log(`column_id: ${column_id}`);

    //...

    response.end({
        columns: columns[0],
        recommend_columns: [columns[1], columns[2], columns[3], columns[4]]
    });
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
