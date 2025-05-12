// Primitive : number, string, boolean
// More complex types : arrays, objects
// Function types, parameter
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
// Primitives
var age;
age = 12;
var username;
username = "tashif";
var isInstructor;
isInstructor = true;
////////////////////////More complex types////////////////////////
//1-arrays
var hobbies;
hobbies = ["cookies", "meat", "drinks"];
var marks;
marks = [1, 2, 3, 4];
var check;
check = [true, false, true];
//2-objects
var person;
person = {
  name: "tashif",
  age: 23,
};
// person = {
//   isEmployee: true,
// };
//shows the err 'isEmployee' does not exist in type '{ name: string; age: number; }'
// An array consists of objects
var employee;
var car = {
  type: "Toyota",
  model: "Corolla",
  year: 2009,
};
console.log(car);
var vehicles = {
  type: "scooter",
  model: 2023,
  year: 2020,
};
// type inference
var course = "React-the complete guide";
// course=1234; //shows the err cannot assign the number to the value type of string
// union types
// assigning the 'or' types
var course2 = "React-the complete guide";
course2 = 12345;
console.log(course2);
var brand;
var product;
// Functions & types
function add(a, b) {
  return a + b;
}
function printValue(value) {
  console.log(value);
}
// Generics
function insertAtBeginning(array, value) {
  var newArray = __spreadArray([value], array, true);
  return newArray;
}
var demoArray = [1, 2, 3];
var updatedArray = insertAtBeginning(demoArray, -1); //[-1,1,2,3]
var stringArray = insertAtBeginning(["a", "b", "c"], "d");
// updatedArray[0].split('')//cannt use split on numbers
// tuple
var ourTuple;
// initialize correctly
ourTuple = [5, false, "Coding is fun"];
// We have no type safety in our tuple for indexes 3+
ourTuple.push("Something new and wrong");
console.log(ourTuple);


