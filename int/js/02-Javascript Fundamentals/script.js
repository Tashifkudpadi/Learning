const items = [
 { name: "toothpaste", price: 99 },
 { name: 'brush', price: 12 },
 { name: "clothes", price: 299 },
 { name: 'pant', price: 1000 },
 { name: 'shoes', price: 899 }
];

const mapIts = items.map(item => {
 return item.name
})
console.log(mapIts);

const accMap = mapIts.sort()
console.log(accMap);

const mapUnits = items.map(item => {
 return item.price
})
console.log(mapUnits);

// descending 
const accmapUnit = mapUnits.sort(function (a, b) { return (b - a) });
console.log(accmapUnit);

console.log('earlier');
console.log('earlier');
console.log('earlier');
console.log('earlier');

const mapprac = items.reduce((curr, val) => {
 return val.price + curr;
}, 0)
console.log(mapprac);

// map
const mapItems = items.map(item => {
 return item.price;
})
console.log(mapItems);

// filter
const filteredItems = items.filter(item => {
 return item.price <= 100;
})
console.log(items);
console.log(items);
console.log(filteredItems);

// reduce
const reduceItems = items.reduce((curr, item) => {
 return item.price + curr
}, 0)
console.log(reduceItems);

// find
const findItem = items.find(item => {
 return item.name === 'toothpaste';
})
console.log(findItem);//display the array with name and price

// some (one condition should be true) returns true or false
const itemsSome = items.some(item => {
 return item.price <= 100;
});
console.log(itemsSome);

// every (every condition should be true) returns true or false
const everyitems = items.every(item => {
 return item.price <= 500
})
console.log(everyitems);

const itemsIncludes = items.map(item => {
 return item.price
})
console.log(itemsIncludes);
const iteratedArry = itemsIncludes.includes(99);
console.log(iteratedArry);

// sorting
// ascending order
const fruitsAs = ["Banana", "Orange", "Apple", "Mango"];
console.log('Ascending', fruitsAs.sort());

const fruitsDe = ["Banana", "Orange", "Apple", "Mango"];
console.log('ascending', fruitsDe.sort());//first convert it in ascending order then reverse it

// descending order
const fruits = fruitsDe.reverse();
console.log('descending', fruits);

const numbers = [23, 1, 12, 32, 100, 99]
console.log('ascending order', numbers.sort(function (a, b) { return a - b }))

const points = [40, 100, 1, 5, 25, 10];
console.log('decending order', points.sort(function (a, b) { return b - a }));

const ascend = [223.5, 67, 86, 33, 4, 5, 67, 90]
console.log('testing', ascend.sort(function (a, b) { return a - b }));
const decnd = ascend.sort(function (a, b) { return a - b });
console.log(decnd.reverse());

// indexof
const num1 = [1, 4, 6, 9];
const num2 = [1, 3, 9];

let array = [];

if (num1.indexOf(1) === num2.indexOf(1) || num1.indexOf(9) === num2.indexOf(9)) {
 array.push(0, 2);
}

console.log(array);

////////////////////////////// hoisting
function makeFunc() {
 const name = 'Mozilla';
 function displayName() {
  console.log(name);
 }
 return displayName;
}
const myFunc = makeFunc();
myFunc();

const convertArry = "12345";
const splitNum = convertArry.split("");
console.log(splitNum);

const sumNumber = splitNum.reduce((curr, val) => {
 return (curr = Number(curr) + Number(val));
});
console.log(sumNumber);

////////////////////////////////////////////
let nums = [2, 7, 11, 15];

function arrayIndex(num) {
 const num1 = nums.indexOf(2)
 const num2 = nums.indexOf(7)
 console.log(num1, num2);

 const array = Array(num1, num2)
 console.log(array);
}
arrayIndex(nums)
////////////////////////////////////////////////////
// without array
let x = 123;
let reversed = 0;

while (x > 0) {
 reversed = reversed * 10 + (x % 10);
 x = Math.floor(x / 10);
}
console.log(reversed); // Output will be 321

// with array
let y = 123;
const reversedArray = y.toString().split('').reverse().map(Number);
console.log(reversedArray); // Output will be [3, 2, 1]

