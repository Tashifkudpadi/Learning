import React, { useState } from "react";

const Ascdesc = () => {
  const [inputNum, setInputNum] = useState("");
  const [ascNumbers, setAscNumbers] = useState([]);
  const [descNumbers, setDescNumbers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const numberArray = inputNum.split("").map(Number);

    const uniqueNumbers = [...new Set(numberArray)];

    const ascSorted = [...uniqueNumbers].sort((a, b) => a - b);
    const descSorted = [...uniqueNumbers].sort((a, b) => b - a);

    setAscNumbers(ascSorted);
    setDescNumbers(descSorted);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setInputNum(e.target.value)}
          value={inputNum}
        />
        <button type="submit">check</button>
      </form>
      <p>Asc order : {ascNumbers.join(", ")}</p>
      <p>Desc order : {descNumbers.join(", ")}</p>
    </>
  );
};

export default Ascdesc;
