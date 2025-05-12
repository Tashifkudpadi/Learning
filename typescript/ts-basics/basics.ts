// Primitive : number, string, boolean
// More complex types : arrays, objects
// Function types, parameter

// Primitives

let age: number;
age = 12;

let username: string;
username = "tashif";

let isInstructor: boolean;
isInstructor = true;

////////////////////////More complex types////////////////////////
//1-arrays
let hobbies: string[];
hobbies = ["cookies", "meat", "drinks"];

let marks: number[];
marks = [1, 2, 3, 4];

let check: boolean[];
check = [true, false, true];

//2-objects

let person: {
  name: string;
  age: number;
};

person = {
  name: "tashif",
  age: 23,
};

// person = {
//   isEmployee: true,
// };
//shows the err 'isEmployee' does not exist in type '{ name: string; age: number; }'

// An array consists of objects
let employee: {
  name: string;
  age: number;
}[];

const car: { type: string; model: string; year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009,
};
console.log(car);

const vehicles: { type: string; model: number; year: number } = {
  type: "scooter",
  model: 2023,
  year: 2020,
};

// type inference

let course = "React-the complete guide";
// course=1234; //shows the err cannot assign the number to the value type of string

// union types
// assigning the 'or' types
let course2: string | number | string[] = "React-the complete guide";
course2 = 12345;
console.log(course2);

// type aliases

// let brand: {
//   id: number;
//   name: string;
// };

// let products: {
//   id: number;
//   name: string;
// }[];

// or

type Brand = {
  id: number;
  name: string;
};

let brand: Brand;

let product: Brand[];

// Functions & types

function add(a: number, b: number) {
  return a + b;
}

function printValue(value: any) {
  console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); //[-1,1,2,3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// updatedArray[0].split('')//cannt use split on numbers

// tuple
let ourTuple: [number, boolean, string];

// initialize correctly
ourTuple = [5, false, "Coding is fun"];

// We have no type safety in our tuple for indexes 3+
ourTuple.push("Something new and wrong");

console.log(ourTuple);

//type, interface and enums

interface User1 {
  name: string;
}

// intersecting
interface Admin1 extends User1 {
  type: string;
}

type User2 =
  | {
      name: string;
    }
  | { name: number };

type Admin2 = User2 & {
  type: string;
};

// cannot assign optional values in interface. remove {name:number in User2}

interface Admin3 extends User2 {
  type: "admin";
}

type Admin4 = User1 & {
  type: "admin";
};
