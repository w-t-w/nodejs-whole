const net = require('net');

const HOST = '127.0.0.1',
    PORT = 7777;

const lessonIds = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
]

const lesson_ids_length = lessonIds.length,
    seq_length = 2,
    package_request_length = 4,
    package_header_length = 6;

let buffer = null,
    seq = 0,
    package_length = null,
    package_request = null,
    index = null,
    id = null;

const socket = new (net.Socket)();

socket.connect({
    host: HOST,
    port: PORT,
    keepAlive: true
});

socket.on('data', data => {
    buffer = (buffer && buffer.length > 0) ? Buffer.concat([buffer, data]) : data;
    while (buffer && buffer.length && (package_length = isReceiveComplete(buffer))) {
        if (buffer.length === package_length) {
            package_request = buffer;
            buffer = null;
        } else {
            package_request = buffer.slice(0, package_length);
            buffer = buffer.slice(package_length);
        }

        const {seq, result} = decode(package_request);
        console.log(`课程包头为 ${seq + 1} 的包的课程名称为 ${result}`);
    }
});

for (let i = 0; i < 200; i++) {
    index = Math.floor(Math.random() * lesson_ids_length);
    id = lessonIds[index];
    socket.write(encode(id));
}

function encode(id) {
    const body = Buffer.alloc(package_request_length);
    body.writeInt32BE(id);
    const body_length = body.length;
    const header = Buffer.alloc(package_header_length);
    console.log(`课程包头为 ${seq + 1} 的包的课程 id 为 ${id}`);
    header.writeInt16BE(seq++);
    header.writeInt32BE(body_length, seq_length);
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const seq = buffer.readInt16BE();
    const body = buffer.slice(package_header_length);
    const result = body.toString();
    return {
        seq,
        result
    };
}

function isReceiveComplete(buffer) {
    if (buffer.length <= package_header_length)
        return 0;
    const body_length = buffer.readInt32BE(seq_length);
    if (buffer.length >= body_length + package_header_length)
        return body_length + package_header_length;
    else
        return 0;
}
