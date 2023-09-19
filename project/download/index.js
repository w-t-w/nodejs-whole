const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const koa_static = require('koa-static');
const koa_mount = require('koa-mount');

const STATIC_DIR = path.resolve(__dirname, './source');
const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const PORT = 7777;

const buffer = fs.readFileSync(TEMPLATE_DIR);

const koa = new Koa();

koa.use(koa_static(STATIC_DIR));

koa.use(async (ctx, next) => {
    const {request} = ctx;
    if (request.url === '/favicon.ico')
        return true;
    await next();
});

koa.use(koa_mount('/', ctx => {
    const {response} = ctx;

    response.status = 200;
    response.type = 'html';
    response.body = buffer;
}));

koa.listen(PORT, () => {
    console.log(`The download page is running at http://localhost:${PORT}!`);
});