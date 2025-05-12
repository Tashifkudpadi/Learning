import React from "react";

const UserList = (props) => {
  return (
    <ul>
      {props.users.map((user) => {
        return (
          <li key={user.id} onClick={() => props.onDelete(user.id)}>
            {user.name} {user.age} {user.id}
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
