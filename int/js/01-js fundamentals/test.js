const items = [
  { name: "toothpaste", price: 99 },
  { name: "brush", price: 12 },
  { name: "clothes", price: 299 },
  { name: "pant", price: 1000 },
];

const mapItems = items.map((item) => {
  return item.price;
});
console.log("mapItems", mapItems);

const getMaxvalue = Math.max(...mapItems);
console.log("getMaxvalue", getMaxvalue);

const sumOfPrice = items.reduce((acc, item) => {
  return acc + item.price;
}, 0);
console.log("sumOfPrice", sumOfPrice);

const filterMaxItmObj = items.filter((item) => item.price === getMaxvalue);
console.log("filterMaxItmObj", filterMaxItmObj);

const findItem = items.find((item) => item.price === getMaxvalue);
console.log("findItem", findItem);

const someItem = items.some((item) => item.price > 200);
console.log("someItem", someItem);

const everyItem = items.every((item) => item.price > 200);
console.log("everyItem", everyItem);

const includesItem = items.some((item) => item.price === 1000);
console.log("includesItem", includesItem);

let arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(arrayOfNumbers.join(""));

let numbers = 123456;
console.log(numbers.toString().split(" ").join(""));
