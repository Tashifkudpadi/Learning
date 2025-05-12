import React, { useEffect, useRef, useState } from "react";

const AddNumber = () => {
  const [inputNum, setInputNum] = useState([]);
  const [evenNum, setEvenNum] = useState([]);
  const [oddNum, setOddNum] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const numberArray = inputNum
      .split("")
      .map((num) => parseInt(num.trim(), 10));

    const uniqueNumbers = [...new Set(numberArray)];

    const evenNumbers = uniqueNumbers.filter((num) => num % 2 === 0);
    const oddNumbers = uniqueNumbers.filter((num) => num % 2 !== 0);

    setEvenNum(evenNumbers);
    setOddNum(oddNumbers);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        value={inputNum}
        onChange={(e) => setInputNum(e.target.value)}
        ref={inputRef}
      />
      <button type="submit">Add Num</button>
      <div>
        Even Numbers:
        {evenNum.join(",")}
      </div>
      <div>odd Numbers :{oddNum.join(",")}</div>
    </form>
  );
};

export default AddNumber;
