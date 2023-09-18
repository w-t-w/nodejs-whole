const eventloop = {
    loop: [],
    init() {
        while(this.loop.length) {
            const callback = this.loop.shift();
            callback();
        }
        setTimeout(this.init.bind(this), 500);
    },
    addEventListener(callback = () => {}) {
        this.loop.push(callback);
    }
};

eventloop.init();

eventloop.addEventListener(() => {
    console.log('right now!');
});

setTimeout(() => {
    eventloop.addEventListener(() => {
        console.log('1 second after!');
    });
}, 1000);

setTimeout(() => {
    eventloop.addEventListener(() => {
        console.log('2 seconds after!');
    }); 
}, 2500);