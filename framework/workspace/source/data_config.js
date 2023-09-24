const fs = require('fs');
const path = require('path');

const PROTO_DIR = path.resolve(process.cwd(), './framework/workspace/source/proto/detail.proto');

const data_config = {
    detail: {
        protocol: 'rpc',
        ip: '127.0.0.1',
        port: 7777,
        timeout: 500,
        protoFile: fs.readFileSync(PROTO_DIR, 'utf-8'),
        requestSchema: 'DetailRequest',
        responseSchema: 'DetailResponse',
        before(data) {
            return data;
        },
        then(data) {
            return data.column;
        },
        catch() {
        }
    },
    article: {
        protocol: 'http',
        url: 'http://127.0.0.1:4000/',
        then(data) {
            return JSON.parse(data).data.list;
        }
    }
};

module.exports = data_config;