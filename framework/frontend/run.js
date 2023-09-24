const Koa = require('koa');
const koa_mount = require('koa-mount');

const factory = require('./factory');
const createTemplate = require('./template');

const run = (config) => {
    const koa = new Koa();

    koa.use(async (ctx, next) => {
        const {request: {url}, response} = ctx;
        if (url === '/favicon.ico') {
            response.status = 200;
            response.body = '';
            return true;
        }
        await next();
    });

    Object.entries(config).forEach(([path, {data_config, template}]) => {
        const {name, content} = template;
        const template_result = createTemplate(name, content);
        data_config = Object.entries(data_config).reduce((initial_result, [type, result_config]) => {
            const {protocol} = result_config;
            factory.createRequester(protocol);
            initial_result[type] = factory(result_config);
            return initial_result;
        }, {});

        koa.use(koa_mount(path, async ctx => {
            const {request, response} = ctx;
            const {query: {column_id}} = request;

            if (typeof column_id === 'undefined') {
                response.status = 400;
                response.body = '';
                return false;
            }

            const result = {};

            await Promise.all(Object.entries(data_config).map(([type, result_config]) => {
                return result_config({column_id})
                    .then(inner_result => {
                        result[type] = inner_result.result;
                        return result[type];
                    });
            }));

            try {
                response.status = 200;
                response.body = template_result(result);
            } catch (err) {
                response.status = 500;
                response.body = err;
            }
        }));
    });

    return koa;
};

module.exports = run;