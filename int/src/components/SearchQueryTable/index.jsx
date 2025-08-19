import { useEffect, useState } from "react";

const SearchQueryTable = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setTableData(data.users));
  }, []);

  const filteredTable = tableData.filter(
    (tdata) =>
      tdata.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tdata.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredTable.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SearchQueryTable;
