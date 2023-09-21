const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const {RPC} = require('./lib');
const columns = require('../data/columns');

const PORT = 7777;

const sort_config = [, 'id', 'sub_count', 'column_price'];

const PROTO_DIR = path.resolve(process.cwd(), './project/list/backend/proto/columns.proto');

const {ListRequest, ListResponse} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const rpc = RPC(ListResponse, ListRequest);

const server = rpc.createServer((request, response) => {
    const {body: {sort = 0, filter = 0}} = request;
    console.log(`sort: ${sort}, filter: ${filter}`);

    //...

    response.end({
        columns: columns.sort((a, b) => {
            const sort_type = sort_config[sort];
            if (typeof sort_type !== 'undefined')
                return a[sort_type] - b[sort_type];
        }).filter(column => filter === 0 ? column : column.type === filter)
    });
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});