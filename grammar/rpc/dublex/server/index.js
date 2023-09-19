const net = require('net');

const PORT = 7777;

const seq_length = 2,
    package_header_length = 6;

const server = net.createServer(socket => {
    let buffer = null,
        package_request = null,
        package_length = null;
    socket.on('data', data => {
        buffer = (buffer && buffer.length > 0) ? Buffer.concat(buffer, data) : data;
        while(buffer.length && (package_length = isReceiveComplete(buffer))) {

        }
    });
});

function isReceiveComplete(buffer) {
    if(buffer.length <= package_header_length)
        return 0;
    const body_length = buffer.readInt32Be(seq_length);
}