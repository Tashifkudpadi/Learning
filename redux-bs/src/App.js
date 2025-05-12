import { useState } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import { v4 as uuidv4 } from "uuid"; // Import the v4 function from the uuid library
import AddNumber from "./components/AddNumber";
import FetchData from "./components/FetchData";
import SearchKeyword from "./components/SearchKeyword";

function App() {
  const [users, setUsers] = useState([]);

  const addUsersHandler = (uName, uAge) => {
    setUsers((preUsers) => {
      return [
        ...preUsers,
        {
          name: uName,
          age: uAge,
          id: uuidv4(),
        },
      ];
    });
  };

  const deleteUserHandler = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div>
      <AddUser onAddUser={addUsersHandler} />
      <UserList users={users} onDelete={deleteUserHandler} />
      <h3>2nd Excercise</h3>
      <AddNumber />
      <h3>3rd Excercise</h3>
      <FetchData />
      <h3>4th Excercise</h3>
      <SearchKeyword />
    </div>
  );
}

export default App;
