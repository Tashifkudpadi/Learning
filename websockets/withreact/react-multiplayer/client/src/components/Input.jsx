import React from "react";

const Input = ({ name, placeholder, handleInput }) => {
  return (
    <div>
      <input
        name={name}
        className="input-field"
        type="text"
        placeholder={placeholder}
        onChange={handleInput}
      />
    </div>
  );
};

export default Input;
