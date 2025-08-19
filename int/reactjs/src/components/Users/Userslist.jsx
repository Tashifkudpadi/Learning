import React from "react";

const Userslist = ({ users, onDelete }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <p key={user.id} onClick={() => onDelete(user.id)}>
            {user.username}
            {user.userage}
          </p>
        );
      })}
    </div>
  );
};

export default Userslist;
