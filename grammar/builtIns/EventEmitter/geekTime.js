const EventEmitter = require('events').EventEmitter;

class GeekTime extends EventEmitter {
    constructor(props) {
        super(props);
        setInterval(() => {
            this.emit('new_lessons', Math.floor(Math.random() * 100));
        }, 500);
    }
}

module.exports = GeekTime;