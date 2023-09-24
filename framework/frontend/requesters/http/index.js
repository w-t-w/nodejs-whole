const request = require('request');
const query_string = require('querystring');

let url = null;

const http = {
    compile(config) {
        return url = config.url;
    },
    request(data) {
        return new Promise((resolve, reject) => {
            request(`${url}?${query_string.stringify(data)}`, (err, result, body) => {
                err ? reject(err) : resolve(body);
            });
        });
    }
};

module.exports = http;

