const path = require('path');
const fs = require('fs');
const protobuf = require('protocol-buffers');

const detail = require('./data/detail');
const {RPC} = require('./lib');

const PORT = 7777;

const PROTO_DIR = path.resolve(process.cwd(), './framework/backend/detail/proto/detail.proto');

const {DetailRequest, DetailResponse} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const rpc = RPC(DetailResponse, DetailRequest);

const server = rpc.createServer((request, response) => {
    const {body: {column_id}} = request;
    console.log(`column_id: ${column_id}`);

    //...

    response.end({
        column: detail[0],
        recommend_columns: [detail[1], detail[2], detail[3], detail[4]]
    });
});

server.listen(PORT, () => {
    console.log(`The detail server is running at http://localhost:${PORT}!`);
});
