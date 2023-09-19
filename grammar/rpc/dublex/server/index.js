const net = require('net');

const PORT = 7777;

const seq_length = 2,
    package_header_length = 6;

const lessons = {
    136797: "01 | 课程介绍",
    136798: "02 | 内容综述",
    136799: "03 | Node.js是什么？",
    136800: "04 | Node.js可以用来做什么？",
    136801: "05 | 课程实战项目介绍",
    136803: "06 | 什么是技术预研？",
    136804: "07 | Node.js开发环境安装",
    136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
    136807: "09 | 模块：CommonJS规范",
    136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
    136809: "11 | 模块：npm",
    141994: "12 | 模块：Node.js内置模块",
    143517: "13 | 异步：非阻塞I/O",
    143557: "14 | 异步：异步编程之callback",
    143564: "15 | 异步：事件循环",
    143644: "16 | 异步：异步编程之Promise",
    146470: "17 | 异步：异步编程之async/await",
    146569: "18 | HTTP：什么是HTTP服务器？",
    146582: "19 | HTTP：简单实现一个HTTP服务器"
}

const server = net.createServer(socket => {
    let buffer = null,
        package_request = null,
        package_length = null;
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

            const {seq, result: id} = decode(package_request);
            socket.write(encode(lessons[id], seq));
        }
    });
});

function encode(data, seq) {
    const body = Buffer.from(data);
    const body_length = body.length;
    const header = Buffer.alloc(package_header_length);
    header.writeInt16BE(seq);
    header.writeInt32BE(body_length, seq_length);
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const seq = buffer.readInt16BE();
    const body = buffer.slice(package_header_length);
    const result = body.readInt32BE();
    return {
        result,
        seq
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

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});