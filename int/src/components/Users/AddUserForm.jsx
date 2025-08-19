import React, { useState } from "react";

const AddUserForm = ({ onaddUsers }) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredUserage, setEnteredUserage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onaddUsers(enteredUsername, enteredUserage);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setEnteredUsername(e.target.value)}
          value={enteredUsername}
        />
        <input
          type="number"
          onChange={(e) => setEnteredUserage(e.target.value)}
          value={enteredUserage}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
