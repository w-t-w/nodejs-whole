exports.username = 'wtw';
exports.age = 29;
exports.gender = true;
exports.hobby = {
    sports: 'basketball'
};

module.exports = {
    username: '比木白',
    age: 22,
    gender: true,
    hobby: {
        sports: 'football'
    }
};

setTimeout(() => {
    console.log(exports);
    console.log(exports.age);
    exports.age = 40;
    console.log(module.exports);
    console.log(module.exports.age);
    module.exports.age = 42;
}, 2000);