
const EventEmitter = require('events').EventEmitter

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go() {
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function(resolve, reject){
            for (let i=countdown.seconds; i>=0; i--) {
                timeoutIds.push(setTimeout(function(){
                    if (countdown.superstitious && i===6) {
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error("oh my got"));
                    }
                    countdown.emit('tick', i);
                    if (i===0) resolve();
                }, (countdown.seconds-i)* 1000));
                
            }
        });
    }
}

function launch() {
    return new Promise(function(resolve, reject){
        //if (Math.random() < 0.5) return; // problem!
        console.log("Lift off!");
        setTimeout(function(){
            resolve("In orbit");
        }, 2*1000);
    });
}


function addTimeout(fn, timeout) {
    if (timeout === undefined) timeout = 4000;
    return function(...args) {
        return new Promise(function(resolve, reject) {
            const tid = setTimeout(reject, timeout, new Error("promise timed out"));
            fn(...args).then(function(...args){
                clearTimeout(tid);
                return resolve(...args);
            }).catch(function(...args){
                clearTimeout(tid); 
                return reject(...args);
            });
        });
    }
}

const c = new Countdown(2);
c.on('tick', function(i) {
    console.log(i + "...");
});

c.go().then(addTimeout(launch)).then(function(msg){
    console.log(msg);
}).catch(function(err){
    console.error(err.message);
});
