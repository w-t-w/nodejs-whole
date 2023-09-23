const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpus = os.cpus();
    // for(let i = 0; i < cpus.length / 2; i++) {
    // for (let i = 0; i < 1; i++) {
    const worker = cluster.fork();
    let ping_count = 0;
    // 心跳检测
    const heart_interval = setInterval(() => {
        console.log('ping');
        worker.send('ping');
        ping_count++;
        if (ping_count >= 3) {
            process.kill(worker.process.pid);
            clearInterval(heart_interval);
        }
    }, 3000);
    worker.on('message', (msg) => {
        if (msg === 'pong') {
            ping_count--;
        }
    });
    // 停机重载
    cluster.on('exit', () => {
        setTimeout(() => {
            cluster.fork();
        }, 3000);
    });
    // }
} else {
    // 错误检测
    process.on('uncaughtException', (err) => {
        console.error('error:', err);
        process.exit(1);
    });
    // 内存检测
    const rss_interval = setInterval(() => {
        const rss = process.memoryUsage.rss();
        console.log('memory usage:', rss);
        if (rss > 200 * 1024 * 1024) {
            console.log('oom');
            process.exit(1);
            clearInterval(rss_interval);
        }
    }, 3000);
    process.on('message', (msg) => {
        if(msg === 'ping') {
            console.log('pong');
            process.send('pong');
        }
    });
    require('./app');
}