
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
