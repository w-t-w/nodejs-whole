const fs = require('fs');
const protobuf = require('protocol-buffers');
const path = require('path');

const PROTO_DIR = path.resolve(__dirname, './user.proto');

const {User} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const buffer1 = Buffer.from('hello nodejs');
const buffer2 = Buffer.from([1, 2, 3, 4]);
const buffer3 = Buffer.alloc(4);

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);
console.log(buffer1.toString());
buffer3.writeInt16BE(512, 2);
console.log(buffer3);
buffer3.writeInt16LE(512, 2);
console.log(buffer3);

const buffer = User.encode({
    username: 'wtw',
    age: 29,
    gender: true,
    hobby: {
        sports: 'basketball'
    }
});
console.log(buffer);
const result = User.decode(buffer);
console.log(result);