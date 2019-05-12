
// bidirect communication
function* iterrogate() {
  const name = yield "What is your name?";
  const color = yield "What is your favorite color?";
  return `${name}'s favorite color is ${color}`;
}

const it = iterrogate();
console.log(it.next());
console.log(it.next('Yunhong'));
console.log(it.next('Blue'));

