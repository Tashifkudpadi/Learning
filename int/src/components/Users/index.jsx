import React, { useState } from "react";
import AddUserForm from "./AddUserForm";
import Userslist from "./Userslist";

const Users = () => {
  const [users, setUsers] = useState([]);

  const addUsers = (uName, uAge) => {
    setUsers((prevUsers) => {
      return [
        ...prevUsers,
        {
          username: uName,
          userage: uAge,
          id: Math.random().toLocaleString(),
        },
      ];
    });
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <AddUserForm onaddUsers={addUsers} />
      <Userslist users={users} onDelete={deleteUser} />
    </div>
  );
};

export default Users;
