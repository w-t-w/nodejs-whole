const GeekTime = require('./geekTime');

const geekTime = new GeekTime();

geekTime.on('new_lessons', price => {
    if (price < 80) {
        console.log(`buy!The new_lessons's price is $${price}!`);
    } else {
        console.log('It\'s too expensive!');
    }
});