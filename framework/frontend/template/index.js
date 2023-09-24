const fs = require('fs');
const vm = require('vm');

const templateCache = {};

const templateContext = vm.createContext({
    _(value) {
        if (value) return '';
        return value.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },
    include(name, data) {
        const template = templateCache[name] || createTemplate(name);
        return template(data);
    }
});

function createTemplate(name, content) {
    templateCache[name] = vm.runInNewContext(`(function (data) {
        with(data) {
            return \`${typeof content === 'undefined' ? fs.readFileSync(name, 'utf-8') : content}\`
        }
    });`, templateContext);
    return templateCache[name];
}

module.exports = createTemplate;