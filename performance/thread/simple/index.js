const path = require('path');

const CP_DIR = path.resolve(__dirname, './child.js');

const cp = require('child_process');

const child_process = cp.fork(CP_DIR);

child_process.send(`hello,It\'s process!Nice to meet you!`);
child_process.on('message', msg => {
    console.log('process!', msg);
});