
function* rainbow() {
  yield 'red';
  yield 'orange';
  yield 'yellow';
}

for (let color of rainbow()) {
  console.log(color);
}

const it = rainbow();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log("it 2");
function* ex_return() {
  const end = yield 'red';
  if (!!end) {
    return ; // no return value for generator is recommended
  }
  yield 'blue'
  yield 'green'
}

const it2 = ex_return();

console.log(it2.next());
console.log(it2.next(true));
