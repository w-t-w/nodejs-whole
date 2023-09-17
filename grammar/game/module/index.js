const game = require('./game');

console.log('现在进入剪刀 石头 布的游戏: ');
console.log('请输入您的手势:(rock scissors or paper)');

let player_won_result = 1,
    player_won_count = 0;

process.stdin.on('data', data => {
    if (player_won_count >= 3) {
        console.log('你太厉害了!我不跟你玩儿了!');
        process.exit(1);
    }

    const action = data.toString().trim();

    const result = game(action);

    if (result === player_won_result) {
        player_won_count++;
    }

    console.log('请输入您的手势:(rock scissors or paper)');
});