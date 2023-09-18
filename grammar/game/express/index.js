const express = require('express');
const fs = require('fs');
const path = require('path');

const game = require('./game');

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

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

const server = express();

server.get('/favicon.ico', (req, res) => {
    res.status(200);
    res.send('');
    return true;
});

server.get('/action', (req, res) => {
    const {query: {action}} = req;

    if(typeof action === 'undefined') {
        res.status(400);
        res.send('');
        return false;
    }

    if(player_won_count >= 3 || same_count === 9) {
        res.status(500);
        res.send('你太厉害了!我不跟你玩儿了!');
        return false;
    }

    if(last_player_action && last_player_action === action) {
        same_count++;
        if(same_count >= 3) {
            same_count = 9;
            res.status(500);
            res.send('你作弊!');
            return false;
        }   
    } else {
        same_count = 0;
    }
    last_player_action = action;

    const result_number = game(action);
    const result = result_selection[result_number];

    if(result_number === player_won_number) 
        player_won_count++;

    res.status(200);
    res.send(result);
});

server.get('/', (req, res) => {
    res.status(200);
    res.send(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});

