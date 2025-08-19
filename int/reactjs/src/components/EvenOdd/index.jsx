import React, { useState } from "react";

const EvenOdd = () => {
  const [inputNum, setInputNum] = useState("");
  const [evenNumbers, setEvenNumbers] = useState([]);
  const [oddNumbers, setOddNumbers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const numberArray = inputNum.split("").map(Number);

    const uniqueNumbers = [...new Set(numberArray)];

    const ascNum = uniqueNumbers.filter((num) => num % 2 === 0);
    const descNum = uniqueNumbers.filter((num) => num % 2 !== 0);

    setEvenNumbers(ascNum);
    setOddNumbers(descNum);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          onChange={(e) => setInputNum(e.target.value)}
          value={inputNum}
        />
        <button type="submit">check</button>
      </form>
      <p>Even Numbers : {evenNumbers.join(", ")}</p>
      <p>Odd Numbers : {oddNumbers.join(", ")}</p>
    </>
  );
};

export default EvenOdd;
