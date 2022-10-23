// Practice for arrays, objects, functions, propotypes

// TASK1: Write such function addRandomValueAtTheEnd to be able to call it from diff arrays.
const arr = [];
const newArr = [];

Array.prototype.addRandomValueAtTheEnd = function(){
    this.push(Math.floor(Math.random() * 1000));
}

arr.addRandomValueAtTheEnd();
arr.addRandomValueAtTheEnd();
newArr.addRandomValueAtTheEnd();
newArr.addRandomValueAtTheEnd();
newArr.addRandomValueAtTheEnd();

console.log(arr) // ['2323'] - some random value at the end.
console.log(newArr)

