import React, { useEffect, useState } from "react";

const Test = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setTableData(data.users);
    }
    fetchData();
  }, []);

  const filteredTable = tableData.filter(
    (tdata) =>
      tdata.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tdata.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredTable.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Test;
