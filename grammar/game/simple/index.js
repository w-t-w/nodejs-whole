const argv = process.argv,
    argv_length = argv.length;

const selection = ['rock', 'scissors', 'paper'],
    selection_length = selection.length;

const player_action = (argv_length > 2 && selection.includes(argv[argv_length - 1])) ? argv[argv_length - 1] : 'rock';

const computer_random = Math.floor(Math.random() * selection_length);
const computer_action = selection[computer_random];

function differentActionJudgement(player, computer) {
    let player_index = null;
    for (let [key, value] of selection.entries()) {
        if (value === player) {
            player_index = key;
            break;
        }
    }
    if (player_index === selection_length - 1)
        player_index = -1;

    return computer === selection[++player_index];
}

console.log(`电脑手势: ${computer_action}, 您的手势: ${player_action}`);

if (player_action === computer_action) {
    console.log('平局!');
} else if (differentActionJudgement(player_action, computer_action)) {
    console.log('你赢了!');
} else {
    console.log('你输了!');
}