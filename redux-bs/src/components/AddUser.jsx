import React, { useState } from "react";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [userAge, setUserAge] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.onAddUser(username, userAge);
    setUsername('')
    setUserAge('')
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        value={userAge}
        onChange={(e) => setUserAge(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
