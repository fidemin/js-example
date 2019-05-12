
const books = [
	"Hi",
	"Good",
	"what?"
]

const it = books.values();
let current = it.next();

while (!current.done) {
    console.log(current.value);
    current = it.next();
}
