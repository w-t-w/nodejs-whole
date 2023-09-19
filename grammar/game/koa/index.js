const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const koa_mount = require('koa-mount');

const game = require('./game');

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const PORT = 7777;

let player_won_count = 0,
    last_player_action = null,
    same_count = 0,
    player_won_number = 1;

const result_section = {
    ['-1']: '你输了!',
    0: '平局!',
    1: '你赢了!'
};

const koa = new Koa();
const game_koa = new Koa();

const buffer = fs.readFileSync(TEMPLATE_DIR);

koa.use(koa_mount('/favicon.ico', ctx => {
    const {request, response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

koa.use(koa_mount('/action', game_koa));

koa.use(koa_mount('/', ctx => {
    const {response} = ctx;

    response.status = 200;
    response.type = 'html';
    response.body = buffer;
}));

game_koa.use(async (ctx, next) => {
    const {response} = ctx;
    if (player_won_count >= 3 || same_count === 9) {
        response.status = 500;
        response.body = '你太厉害了!我不跟你玩儿了!';
        return false;
    }

    await next();

    if (ctx.player_won)
        player_won_count++;
});

game_koa.use(async (ctx, next) => {
    const {request: {query: {action}}, response} = ctx;

    if (typeof action === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    if (last_player_action && last_player_action === action) {
        same_count++;
        if (same_count >= 3) {
            same_count = 9;
            response.status = 500;
            response.body = '你作弊!';
            return false;
        }
    } else {
        same_count = 0;
    }
    last_player_action = action;

    await new Promise((resolve) => {
        const timer = setTimeout(() => {
            const result_number = game(action);

            if (result_number === player_won_number)
                ctx.player_won = true;

            const result = result_section[result_number];
            ctx.result = result;

            resolve();
            clearTimeout(timer);
        }, 500);
    });

    await next();
});

game_koa.use(ctx => {
    const {result, response} = ctx;
    response.status = 200;
    response.body = result;
});

koa.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});