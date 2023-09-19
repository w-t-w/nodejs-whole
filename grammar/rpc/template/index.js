const vm = require('vm');

const user = {name: 'wtw', age: 29};

console.log(`hello, I'm ${user.name}, ${user.age} year's old!`);
const result = vm.runInNewContext('`hello, I\'m ${user.name}, ${user.age} year\'s old!`', {user});
console.log(result);
const context = vm.createContext({
    user,
    _(value) {
        if (!value) return '';
        return value.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
    include(name) {
        return template[name]();
    }
});

const template = {
    A: '<p>${include("B")}</p>',
    B: '<h1>hello, I\'m ${user.name}, ${user.age} year\'s old!</h1>'
};

Object.entries(template).forEach(([key, value]) => {
    template[key] = vm.runInNewContext(`(function() {
        return \`${value}\`;
    })`, context);
});

const template_result = template['A']();
console.log(template_result);