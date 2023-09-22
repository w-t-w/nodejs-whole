const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster) {
    const cpus = os.cpus();
    for(let i = 0;i < (cpus.length / 2); i++) {
        cluster.fork();
    }
} else {
    require('./app');
}