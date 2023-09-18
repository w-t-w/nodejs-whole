function game(player_action) {
    const selection = ['rock', 'scissors', 'paper'],
        selection_length = selection.length;

    player_action = (typeof player_action !== 'undefined' && selection.includes(player_action)) ? player_action : 'rock';

    const computer_random = Math.floor(Math.random() * selection_length);
    const computer_action = selection[computer_random];

    function differentActionJudgement(player, computer) {
            let player_index = null;
            for(const [key, value] of selection.entries()) {
                if(player === value) {
                    player_index = key;
                    break;
                }
            }
            if(player_index === selection_length - 1)
                player_index = -1;
            return computer === selection[++player_index];
    }

    if(computer_action === player_action) {
        return 0;
    } else if (differentActionJudgement(player_action, computer_action)) {
        return 1;
    } else {
        return -1;
    }
}

module.exports = game;