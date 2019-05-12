
class Counter {
  [Symbol.iterator]() {
    let current = 0
    return {
      next() {
        let rval = {value: current, done: false};
        current++;
        return rval;
      }
    }
  }
}


let c = new Counter();

for (let n of c) {
  console.log(n);
  if (n === 10) break;
}

