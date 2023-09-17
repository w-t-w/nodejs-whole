// try {
//     interview((result) => {
//         console.log(`smile!${result}`);
//     });
// } catch (err) {
//     console.error(`cry!${err}`);
// }
//
// function interview(callback) {
//     const timer = setTimeout(() => {
//         clearTimeout(timer);
//         const random = Math.random();
//         if (random > 0.3) {
//             callback('success!');
//         } else {
//             throw new Error('failed!');
//         }
//     }, 500);
// }
interview((err, result) => {
    if (err) return console.error(`cry!${err.message}`);
    console.log(`smile!${result}`);
});

function interview(callback) {
    const timer = setTimeout(() => {
        clearTimeout(timer);
        const random = Math.random();
        if (random > 0.3) {
            callback(null, 'success!');
        } else {
            callback(new Error('failed!'));
        }
    }, 500);
}