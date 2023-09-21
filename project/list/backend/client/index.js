const Koa = require('koa');
const path = require('path');
const {renderToString} = require('react-dom/server');
const koa_mount = require('koa-mount');
const koa_static = require('koa-static');

const tcp_client = require('./lib');
const template = require('../template');
const App = require('../build/ssr_index');

const PORT = 4000;

const STATIC_DIR = path.resolve(process.cwd(), './project/list/backend/source');
const TEMPLATE_DIR = path.resolve(process.cwd(), './project/list/backend/template/index.html');

const koa = new Koa();

koa.use(koa_static(STATIC_DIR));

koa.use(async (ctx, next) => {
    const {request} = ctx;
    if (request.url === '/favicon.ico')
        return true;
    await next();
});

koa.use(koa_mount('/data', async ctx => {
    const {request, response} = ctx;
    const {query: {sort, filter}} = request;

    if (typeof sort === 'undefined' || typeof filter === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    const result = await new Promise((resolve, reject) => {
        tcp_client.write({
            sort: +sort,
            filter: +filter
        }, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });

    response.status = 200;
    response.body = result;
}));

koa.use(koa_mount('/', async ctx => {
    const {request, response} = ctx;
    const {query: {sort = 0, filter = 0}} = request;

    const result = await new Promise((resolve, reject) => {
        tcp_client.write({
            sort: +sort,
            filter: +filter
        }, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });

    const renderString = renderToString(App(result)),
        renderData = result;

    const template_func = template(TEMPLATE_DIR);

    response.status = 200;
    response.body = template_func({
        renderString,
        renderData,
        sort,
        filter
    });
}));

koa.listen(PORT, () => {
    console.log(`The list page is running at http://localhost:${PORT}!`);
});