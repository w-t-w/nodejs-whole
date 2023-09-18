(async () => {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
        await interview(4);
    } catch (e) {
        return console.error(`cry at round ${e.round}!`);
    }
    console.log('smile!');
})();

async function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if(random > 0.4) {
                resolve('success!');
            } else {
                const error = new Error('failed');
                error.round = round;
                reject(error);
            }
        }, 500);
    });
}