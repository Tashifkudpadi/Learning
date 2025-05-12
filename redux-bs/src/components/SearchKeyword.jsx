import React, { useEffect, useState } from "react";

const SearchKeyword = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  },[]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSearch = users.filter((user) => {
    const { firstName, lastName, email } = user;
    const searchLower = searchTerm.toLowerCase();

    return (
      firstName.toLowerCase().includes(searchLower) ||
      lastName.toLowerCase().includes(searchLower) ||
      email.toLowerCase().includes(searchLower)
    );
  });
  return (
    <div>
      <input type="text" onChange={handleSearch} value={searchTerm} />
      <table>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredSearch.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SearchKeyword;
