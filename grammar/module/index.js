console.log('process start!!!');
const user = require('./cjs');
const {age} = require('./cjs');

console.log(user);
console.log(age);

setTimeout(() => {
    console.log(user);
    console.log(user.age);
    console.log(age);
    user.age = 18;
}, 1000);

setTimeout(() => {
    console.log(user);
    console.log(user.age);
    console.log(age);
}, 3000);
console.log('process stop!!!!');