const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const koa_mount = require('koa-mount');
const koa_static = require('koa-static');
const koa_graphql = require('koa-graphql');

const schema = require('./lib');

const PORT = 7777;

const STATIC_DIR = path.resolve(process.cwd(), './project/video/source');
const TEMPLATE_DIR = path.resolve(process.cwd(), './project/video/template/index.html');

const buffer = fs.readFileSync(TEMPLATE_DIR);

const koa = new Koa();

koa.use(koa_static(STATIC_DIR));

koa.use(async (ctx, next) => {
    const {request: {url}} = ctx;
    if (url === '/favicon.ico')
        return false;
    await next();
});

koa.use(koa_mount('/api', koa_graphql.graphqlHTTP({
    schema
})));

koa.use(koa_mount('/', ctx => {
    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = buffer;
}));

koa.listen(PORT, () => {
    console.log(`The video page is running at http://localhost:${PORT}!`);
});