function countdown(seconds) {
    const timeoutIds = [];
    return new Promise(function(resolve, reject) {
        for(let i=seconds; i>=0; i--) {
            timeoutIds.push(setTimeout(function() {
                if (i===6) {
                    timeoutIds.forEach(clearTimeout);
                    return reject(new Error("oh my got"));
                } 
                if (i>0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000));
        }
    });
}

const p = countdown(7);

p.then(
    function() {
        console.log("countdown completed successful");
    }
).catch(
    function(err) {
        console.log("countdown error:" + err.message);
    }
);
