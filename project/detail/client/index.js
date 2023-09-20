const path = require('path');
const Koa = require('koa');
const koa_mount = require('koa-mount');
const koa_static = require('koa-static');

const tcp_client = require('./lib');
const template = require('../template');

const PORT = 3000;

const STATIC_DIR = path.resolve(process.cwd(), './project/detail/source');
const TEMPLATE_DIR = path.resolve(process.cwd(), './project/detail/template/index.html');

const koa = new Koa();

koa.use(koa_static(STATIC_DIR));

koa.use(async (ctx, next) => {
    if (ctx.url === '/favicon.ico')
        return false;
    await next();
});

koa.use(koa_mount('/', async ctx => {
    const {request: {query: {column_id}}, response} = ctx;

    if (typeof column_id === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    const result = await new Promise((resolve, reject) => {
        tcp_client.write({
            column_id
        }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });

    const template_func = template(TEMPLATE_DIR);

    response.status = 200;
    response.body = template_func(result);
}));

koa.listen(PORT, () => {
    console.log(`The detail page is running at http://localhost:${PORT}!`);
});