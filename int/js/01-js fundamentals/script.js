// Array methods

/////////////////////////////////// ////////////////////////////////////////////
// toString();
// Converts the array to a string (comma-separated).
let names = ["Danny", "Joe", "Sarah", "Molly"];
let stringNames = names.toString();
console.log(stringNames);

const arr = [1, 2, 3];
console.log(arr.toString()); // "1,2,3"

/////////////////////////////////// ////////////////////////////////////////////
// join(separator)
// Joins array elements with a custom separator.
const arr1 = ["React", "JS", "is", "awesome"];
console.log(arr1.join(" ")); // "React JS is awesome"

/////////////////////////////////// ////////////////////////////////////////////
// concat();
// Combines two or more arrays.
let names3 = ["Danny", "Joe", "Sarah", "Molly"];
let moreNames = ["Sara", "Julia", "Max"];
let namesConcat = names3.concat(moreNames, ["John", "Mary"]);
console.log(namesConcat);

const a = [1, 2];
const b = [3, 4];
console.log(a.concat(b)); // [1, 2, 3, 4]

/////////////////////////////////// //////////////////////////////////////////
// join();
let names2 = ["Danny", "Joe", "Sarah", "Molly"];
let stringNames2 = names2.join(", ");
console.log(stringNames2);

/////////////////////////////////// //////////////////////////////////////////
// some();
let numbersArray4 = [1, 2, 3, 4];
let isEven = numbersArray4.some(function (number) {
  return number % 2 === 0;
});
console.log(isEven); //true

let isGreaterThan5 = numbersArray4.some((n) => n > 5);
console.log(isGreaterThan5);

// every();
let numbersArray5 = [1, 2, 3, 4];
let isEven2 = numbersArray5.every(function (number) {
  return number % 2 === 0;
});
console.log(isEven2); //false

let allGreaterThan0 = numbersArray5.every((n) => n > 0);
console.log(allGreaterThan0); //true
let allGreaterThan1 = numbersArray5.every((n) => n > 1);
console.log(allGreaterThan1); //false

/////////////////////////////////// ////////////////////////////////////////////
const items = [
  { name: "Bike", price: 100 },
  { name: "TV", price: 200 },
  { name: "Album", price: 10 },
  { name: "Book", price: 5 },
  { name: "Phone", price: 500 },
  { name: "Computer", price: 1000 },
  { name: "Keyboard", price: 25 },
];

//map,
//map() is used to perform some operation on each element of the array
//map() is used to create a new array
//map() is used to iterate over the array
//map() is used to return a new array
const mapItems = items.map((item) => {
  return item.price * 2;
});
console.log(mapItems);

const itemNames = items.map((item) => {
  return item.name;
});
console.log(itemNames);

/////////////////////////////////// ////////////////////////////////////////////
// filter
//filter() is used to filter the array based on the condition
//filter() is used to get the new array
const filteredItems = items.filter((item) => item.price >= 200);
console.log(filteredItems);

/////////////////////////////////// ////////////////////////////////////////////
// reduce

const reduceItems = items.reduce((acc, item) => {
  return acc + item.price;
}, 0);
console.log(reduceItems);

const mostExpensive = items.reduce((max, item) => {
  return item.price > max.price ? item : max;
}, items[0]);

console.log(mostExpensive); // {name: "Computer", price: 1000

//Using filter method
const getValues = items.map((item) => item.price);
console.log(getValues);

const getMaxvalue = Math.max(...getValues);
console.log(getMaxvalue);

const filterMaxItmObj = items.filter((item) => item.price === getMaxvalue);
console.log(filterMaxItmObj);

//find
const foundItem = items.find((item) => {
  return item.name === "Album";
});
console.log(foundItem); //returns the element

///////////foreach
items.forEach((item) => {
  console.log(item.price);
});
//100
//200
//10
//5
//foreach method prints without array while map method prints in [100,200,10,5 and so on]

let count = 0;
let mynames = ["Tessa", "Anee", "Tas"];
mynames.forEach((n) => {
  count++;
});
console.log(count);

//some
const hasInexpensiveItems = items.some((item) => {
  return item.price <= 100;
});
console.log(hasInexpensiveItems);
//////////////////////////////////////////////////////////////////////////////////
// splice();//Used to remove the elements from the array also we can add some new elements and it mutates original array
// splice(start, deleteCount, ...items)
// Removes/replaces/adds items in-place.
// Returns the removed items.
let names4 = names3.splice(2, 1); //2 is start index and 1 is how many elements we want to remove
console.log(names4); //['Sarah']
console.log(names3); //(3) ['Danny', 'Joe', 'Molly']

//we can make the copy of the array using spread operator
let namesCopy = [...names3];
let names5 = names3.splice(2, 1);
console.log(names5); //['Danny', 'Joe', 'Molly']

//now we can remove the names3.splice(2,1) line to see the original array

// Adding the element using splice
let names7 = ["Danny", "Joe", "Sarah", "Molly"];
names7.splice(1, 2, "Bill", "Bob");
console.log(names7);

const arr3 = [1, 2, 3, 4];
arr3.splice(1, 2, "a", "b");
console.log(arr); // [1, 'a', 'b', 4]

//////////////////////////////////////////////////////////////////////////////////
// slice // is used to get the part of the array
// slice(start, end)
// Returns a shallow copy of a portion of an array.
let names8 = ["Danny", "Joe", "Sarah", "Molly"];
let names9 = names8.slice(1, 3); //1 is index and 3 is upto element but does not prinnt 3rd element
console.log(names9);
console.log(names8); //does not mutate original array

const arr4 = [1, 2, 3, 4, 5];
console.log(arr4.slice(1, 4)); // [2, 3, 4]

// if we want to get the element from the index 1 to the end we can use below code
let names10 = names8.slice(1);
console.log(names10);

//////////////////////////////////////////////////////////////////////////////////

// indexOf();
// indexOf() vs lastIndexOf()
// Both methods search for an item in an array and return its index, but they differ in direction:
// Start → End
// Returns first match
let names11 = ["Danny", "Joe", "Sarah", "Molly"];
let index = names11.indexOf("Sarah");
console.log(index); //2

// lastIndexOf();
// End → Start
//Return Last match
let names12 = ["Danny", "Joe", "Sarah", "Molly", "Sarah"];
let index2 = names12.lastIndexOf("Sarah");
console.log(index2); //4
const arr5 = [10, 20, 30, 20];
console.log(arr5.indexOf(20)); // 1

// forEach();
// Executes a function on each item, but doesn't return anything.

let names13 = ["Danny", "Joe", "Sarah", "Molly"];
names13.forEach(function (name, index) {
  console.log(name, index);
});
//forEach() is not used to change the original array
//forEach() is used to perform some operation on each element of the array
//forEach() is used to iterate over the array

// map();
let names14 = ["Danny", "Joe", "Sarah", "Molly"];
let names15 = names14.map(function (name, index) {
  return name + " is at index " + index;
});
console.log(names15);

let numbersArray = [1, 2, 3, 4];
let numbersArray2 = numbersArray.map(function (number) {
  return number * 2;
});
console.log(numbersArray2); // [2, 4, 6, 8]
console.log(numbersArray);

// filter();
let names16 = ["Danny", "Joe", "Sarah", "Molly"];
let names17 = names16.filter(function (name, index) {
  return name.length > 4;
});
console.log(names17);
//filter() is used to filter the array based on the condition
//filter() is used to get the new array

// reduce();
let numbersArray3 = [1, 2, 3, 4];
let sum = numbersArray3.reduce(function (accumulator, current) {
  return accumulator + current;
}, 0);
console.log(sum); //10

let nums = [1, 2, 3, 4, 5, 6];
let total = nums.reduce((total, currentVal) => total + currentVal);
console.log(total);

// flat();
let numbersArray6 = [1, 2, [3, 4, [5, 6]], 7];
let flatArray = numbersArray6.flat();
console.log(flatArray); // [1, 2, 3, 4, 7]

// find();
let numbersArray7 = [1, 2, 3, 4];
let findNumber = numbersArray7.find(function (number) {
  return number === 3;
});
console.log(findNumber); //3

let stock = [
  { item: "ketchup", quantity: 32 },
  { item: "mayo", quantity: 9 },
  { item: "hot sauce", quantity: 12 },
  { item: "mayo", quantity: 12 },
];
let mayo = stock.find((s) => s.item === "mayo");
console.log(mayo); //returns first occurrence of "mayo"

// findIndex();
// Returns the index of the first matching item.
let numbersArray8 = [1, 2, 3, 4];
let findIndexNumber = numbersArray8.findIndex((number) => {
  return number === 3;
});
console.log(findIndexNumber); //2

let mayoo = stock.findIndex((s) => s.item === "mayo");
console.log(mayoo);

const index1 = [5, 12, 8, 130].findIndex((num) => num > 10);
console.log(index1); // 1

// sort() in desceding ordr;
let numbersArray9 = [1, 2, 3, 4];
let sortArray = numbersArray9.sort((a, b) => {
  return b - a;
});
console.log(sortArray); // [1, 2, 3, 4]

// call
// 🔹 Invokes the function immediately, and lets you set this + pass arguments one by one
const person = {
  name: "Tashif",
};

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}
greet.call(person, "Hello", "!"); // Hello, Tashif!

// apply
// 🔹 Same as call(), but you pass arguments as an array
greet.apply(person, ["Hi", "!!"]);
// Output: "Hi, Tashif!!"

// bind();
// 🔹 Doesn’t call the function immediately.
// 🔹 Instead, it returns a new function with this bound — you can call it later.
const greetTashif = greet.bind(person, "Hey", "!!!");
greetTashif();
// Output: "Hey, Tashif!!!"

//convert array of numbers to array of strings
const test = [1, 2];
console.log("res", test.map(String));
// Output: "res" [ "1", "2" ]

// convert array to strings to array of numbers
const test2 = ["1", "2"];
console.log("res", test2.map(Number));
// Output: "res" [ 1, 2 ]

const arrayOfNumbers = 1234;
const arrayOfNumbers2 = 5678;
const alter = String(arrayOfNumbers) + String(arrayOfNumbers2);
console.log(alter);

const convertToArry = alter.split("").map(Number);
console.log(convertToArry);
