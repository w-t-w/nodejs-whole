const http = require('http');
const fs = require('fs');
const {resolve} = require('path');
const url = require('url');
const query_string = require('querystring');

const game = require('./game');

const TEMPLATE_DIR = resolve(__dirname, './template/index.html');

const PORT = 7777;

const result_selection = {
    ['-1']: '你输了!',
    0: '平局!',
    1: '你赢了!'
};

let player_won_number = 1,
    last_player_action = null,
    same_count = 0,
    player_won_count = 0;

const server = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') {
        res.writeHead(200);
        res.end('');
        return true;
    }

    const {url: req_url} = req;
    const {pathname, query} = url.parse(req_url);
    const {action} = query_string.parse(query);

    if(pathname === '/action') {
        if(typeof action === 'undefined') {
            res.writeHead(400);
            res.end('');
            return false;
        }

        if(player_won_count >= 3 || same_count === 9) {
            res.writeHead(500);
            res.end('你太厉害了!我不跟你玩儿了!');
            return false;
        }

        if(last_player_action && last_player_action === action) {
           same_count++;
           if(same_count >= 3) {
              same_count = 9;
              res.writeHead(500);
              res.end('你作弊!');
              return false;
           }
        } else {
            same_count= 0;
        }
        last_player_action = action;

        const result_number = game(action);
        const result = result_selection[result_number];

        if(result_number === player_won_number)
            player_won_count++;        

        res.writeHead(200);
        res.end(result);
    }

    if(pathname === '/') {
        res.writeHead(200);
        res.end(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
    }
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});