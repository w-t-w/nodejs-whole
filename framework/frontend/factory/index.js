const fs = require('fs');
const path = require('path');

const DEFAULT_REQUESTER_DIR = path.resolve(process.cwd(), './framework/frontend/requesters');

const requesterSelection = ['http', 'rpc'];

const requesterCache = {};

function factory(config) {
    const before = config.before || (data => data),
        then = config.then || (data => data),
        cache_able = config.cache || (error => error);

    const protocol = config.protocol;

    const requester = requesterCache[protocol];
    requester['compile'](config);

    return async function (data) {
        try {
            data = before(data);
        } catch (err) {
            console.error(err);
            return Promise.resolve(null);
        }

        return {
            result: await requester['request'](data)
                .then(then)
                .catch(cache_able)
        }
    }
}

factory.createRequester = (name, requester) => {
    if (requesterSelection.includes(name) && typeof requester === 'undefined') {
        requesterCache[name] = require(path.resolve(DEFAULT_REQUESTER_DIR, name));
    }
    if (typeof requester !== 'undefined') {
        requesterCache[name] = requester;
    }
};

module.exports = factory;