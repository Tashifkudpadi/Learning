// Array Methods Examples

// 1. forEach - Iterates over each element in the array
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
  console.log(`Number: ${num}`);
});

// 2. map - Creates a new array by applying a function to each element
const squaredNumbers = numbers.map((num) => num * num);
console.log("Squared Numbers:", squaredNumbers);

// 3. filter - Creates a new array with elements that pass a condition
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("Even Numbers:", evenNumbers);

// 4. reduce - Reduces the array to a single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of Numbers:", sum);

// 5. find - Finds the first element that satisfies a condition
const firstEven = numbers.find((num) => num % 2 === 0);
console.log("First Even Number:", firstEven);

// 6. some - Checks if at least one element satisfies a condition
const hasNegative = numbers.some((num) => num < 0);
console.log("Has Negative Numbers:", hasNegative);

// 7. every - Checks if all elements satisfy a condition
const allPositive = numbers.every((num) => num > 0);
console.log("All Positive Numbers:", allPositive);

// 8. sort - Sorts the array (modifies the original array)
const unsorted = [3, 1, 4, 1, 5, 9];
unsorted.sort((a, b) => a - b);
console.log("Sorted Array:", unsorted);

// 9. concat - Merges two or more arrays
const moreNumbers = [6, 7, 8];
const combined = numbers.concat(moreNumbers);
console.log("Combined Array:", combined);

// 10. slice - Returns a shallow copy of a portion of an array
const sliced = numbers.slice(1, 4);
console.log("Sliced Array:", sliced);

// 11. splice - Adds/Removes elements in an array
const spliced = [...numbers];
spliced.splice(2, 1, 99); // Removes 1 element at index 2 and adds 99
console.log("Spliced Array:", spliced);
// 12. flat - Flattens nested arrays into a single array
const nestedArray = [1, [2, [3, [4]], 5]];
const flattenedArray = nestedArray.flat(2); // Flattens up to 2 levels
console.log("Flattened Array:", flattenedArray);

// 13. flatMap - Maps each element and flattens the result
const words = ["hello", "world"];
const flatMapped = words.flatMap((word) => word.split(""));
console.log("FlatMapped Array:", flatMapped);

// 14. reduceRight - Reduces the array from right to left
const reduceRightResult = numbers.reduceRight((acc, num) => acc + num, 0);
console.log("ReduceRight Result:", reduceRightResult);

// 15. Array.from - Creates an array from an iterable or array-like object
const string = "12345";
const arrayFromString = Array.from(string, (char) => Number(char));
console.log("Array from String:", arrayFromString);

// 16. Array.of - Creates an array from arguments
const arrayOfNumbers = Array.of(10, 20, 30);
console.log("Array of Numbers:", arrayOfNumbers);

// 17. includes - Checks if an array includes a specific value
const hasThree = numbers.includes(3);
console.log("Includes 3:", hasThree);

// 18. indexOf - Finds the index of the first occurrence of a value
const indexOfFour = numbers.indexOf(4);
console.log("Index of 4:", indexOfFour);

// 19. lastIndexOf - Finds the index of the last occurrence of a value
const repeatedArray = [1, 2, 3, 2, 1];
const lastIndexOfTwo = repeatedArray.lastIndexOf(2);
console.log("Last Index of 2:", lastIndexOfTwo);

// 20. fill - Fills an array with a static value
const filledArray = new Array(5).fill(0);
console.log("Filled Array:", filledArray);

// 21. copyWithin - Copies part of an array to another location in the same array
const copyWithinArray = [1, 2, 3, 4, 5];
copyWithinArray.copyWithin(0, 3); // Copies elements from index 3 to the start
console.log("CopyWithin Array:", copyWithinArray);

// 22. findIndex - Finds the index of the first element that satisfies a condition
const indexOfFirstEven = numbers.findIndex((num) => num % 2 === 0);
console.log("Index of First Even Number:", indexOfFirstEven);

// 23. isArray - Checks if a value is an array
const isArrayCheck = Array.isArray(numbers);
console.log("Is Numbers an Array:", isArrayCheck);

// 24. sort with custom comparator - Advanced sorting
const objectsArray = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 },
];
objectsArray.sort((a, b) => a.age - b.age); // Sort by age
console.log("Sorted Objects by Age:", objectsArray);

// 25. Chaining multiple methods - Combining map, filter, and reduce
const chainedResult = numbers
  .map((num) => num * 2) // Double each number
  .filter((num) => num > 5) // Keep numbers greater than 5
  .reduce((acc, num) => acc + num, 0); // Sum the remaining numbers
console.log("Chained Result:", chainedResult);

// 26. convert number to array
const num = 12345;
const arry = num.toString().split("").map(Number);
console.log("arry", arry);

// or

const arry2 = Array.from(String(num), Number);
console.log("arry2", arry2);
// to revert it back
const reverted = Number(arry2.join(""));
console.log("reverted", reverted);

var x = null;
console.log(x);

(function () {
  console.log("test");
})();

//parameters and arguments
function user(name) {
  console.log(name);
}
console.log(user("tashif")); //arguments

// call
function greet() {
  return "hello" + this.name;
}
let person = { name: "tariz" };
console.log(greet.call(person));

function saySomething(message) {
  return this.name + " is " + message;
}
var person4 = { name: "John" };
let res = saySomething.call(person4, "awesome");
console.log("call method:", res);

// Returns "John is awesome"

// apply
function saySomething(message) {
  return this.name + " is " + message;
}
var person4 = { name: "John" };
let res2 = saySomething.apply(person4, ["bad"]);
console.log("apply method:", res2);

// bind

let bikeDetails = {
  displayDetails: function (registrationNumber, brandName) {
    return (
      this.name +
      " , " +
      "bike details: " +
      registrationNumber +
      " , " +
      brandName
    );
  },
};

var person1 = { name: "Vivek" };

var detailsOfPerson1 = bikeDetails.displayDetails.bind(
  person1,
  "TS0122",
  "Bullet"
);

// Binds the displayDetails function to the person1 object

console.log("bind method:", detailsOfPerson1());
//Returns Vivek, bike details: TS0122, Bullet

///////////////// convert this to arrow
let obj = { id: "1", name: "user22", age: "26", work: "programmer" };
let array = Object.values(obj);
console.log(array); //only values will be in array

let array2 = Object.keys(obj);
console.log(array2); //only keys will be in array

let array3 = Object.entries(obj);
console.log(array3); //both keys and values will be in array of array

let array4 = Object.assign(obj);
console.log(array4); //assign the object to another object

let array5 = [obj];
console.log(array5); //Array of object

///////////////// convert array to object
let arrayToObj = Object.fromEntries(array3);
console.log(arrayToObj);

let arr = [
  { key: "id", value: "1" },
  { key: "name", value: "user22" },
  { key: "age", value: "26" },
  { key: "work", value: "programmer" },
];
let obj2 = arr.reduce((acc, item) => {
  acc[item.key] = item.value;
  return acc;
}, {});
console.log(obj2);

let obj3 = { ...arr };
console.log(obj3);
// { 0: "1", 1: "user22", 2: "26", 3: "programmer" }

// ⚡ Quick summary:
// Use Object.fromEntries() if you have [key, value] pairs.
// Use reduce() if you have array of objects with key and value.
// Spread ... if you just want indices as keys.
