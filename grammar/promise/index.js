interview(1)
.then(() => {
    return interview(2);
})
.then(() => {
    return interview(3);
})
.then(() => {
    console.log('smile!');
})
.catch((e) => {
    console.error(`cry at round ${e.round}!`);
});

function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.3) {
                resolve('success!');
            } else {
                const error = new Error('failed');
                error.round = round;
                reject(error);
            }
        }, 1000);
    });
}