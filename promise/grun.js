
const fs = require('fs')

function nfcall(f, ...args) {
  return new Promise(function(resolve, reject) {
    // f should accept error first callback function
    // ex) fs.readFile(path[,option],cb) , cb: (err, data) => {}
    f.call(null, ...args, function(err, ...args) {
      if (err) return reject(err);
      resolve(args.length<2 ? args[0]: args);
    });
  });
}

function ptimeout(delay) {
  return new Promise(function(resolve, reject){
    setTimeout(resolve, delay);
  });
}

function grun(g) {
  const it = g(); // g should be generator
  (function iterate(val) {
    const x = it.next(val);
    if(!x.done) {
      if (x.value instanceof Promise) {
        // iterate를 계속 실행한다.
        x.value.then(iterate).catch(err => {
          console.log(err);
          it.throw(err); // generator g 내에 throw err를 날린다. g 함수 내에서 catch로 잡으면 된다.
        });
      } else {
        setTimeout(iterate, 0, x.value); // async in recursive reclaims memory fast 
      }
    }
  })();
}

function* ex() {
  let value = yield 'hi'
  console.log(value)
  value = yield 'why'
  console.log(value)
}

grun(ex);


function* theFutureIsNow() {
  try {
    const dataA = yield nfcall(fs.readFile, 'a.txt');
    const dataB = yield nfcall(fs.readFile, 'b.txt');
    const dataC = yield nfcall(fs.readFile, 'c.txt');
  } catch(err) {
    console.error("Unable to read file:" + err);
    return;
  }
  yield ptimeout(1*1000);
  yield nfcall(fs.writeFile, 'd.txt', dataA + dataB);
}

grun(theFutureIsNow);
