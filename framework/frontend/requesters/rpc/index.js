const EasySock = require('easy_sock');
const protobuf = require('protocol-buffers');

const package_header_length = 8,
    seq_length = 4;

let socket = null;

const rpc = {
    compile(config) {
        const {ip, port, timeout, protoFile, requestSchema, responseSchema} = config;

        socket = new EasySock({
            ip,
            port,
            timeout,
            keepAlive: true
        });

        const schema = protobuf(protoFile);
        const DetailRequest = schema[requestSchema];
        const DetailResponse = schema[responseSchema];

        socket.encode = (data, seq) => {
            const body = DetailRequest.encode(data);
            const body_length = body.length;
            const header = Buffer.alloc(package_header_length);
            header.writeInt32BE(seq);
            header.writeInt32BE(body_length, seq_length);
            return Buffer.concat([header, body]);
        };

        socket.decode = buffer => {
            const seq = buffer.readInt32BE();
            const body = buffer.slice(package_header_length);
            const result = DetailResponse.decode(body);
            return {
                result,
                seq
            };
        };

        socket.isReceiveComplete = buffer => {
            if (buffer.length <= package_header_length)
                return 0;
            const body_length = buffer.readInt32BE(seq_length);
            if (buffer.length >= package_header_length + body_length)
                return package_header_length + body_length;
            else
                return 0;
        };
    },
    request(data) {
        return new Promise((resolve, reject) => {
            socket.write(data, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }
};

module.exports = rpc;