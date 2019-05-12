
class Log {
    constructor() {
        this.messages = []; 
    }
    add(message) {
        this.messages.push({message, timestamp: Date.now()});
    }
    // Symbol method
    [Symbol.iterator]() {
        return this.messages.values();
    }
    
}

const log = new Log();
log.add("first day");
log.add("spotted");
log.add("what?");


for (let entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
}
