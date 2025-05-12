import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [formInputs, setFormInputs] = useState({
    name: "",
    age: "",
    phone: "",
  });
  const [crudDataState, setCrudDataState] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const socket = io("localhost:9000");

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newData = {
      ...formInputs,
      id: Math.random().toString(),
    };
    socket.emit("data", newData);
    socket.on("crudData", (response) => {
      setCrudDataState(response);
    });
    setFormInputs({ name: "", age: "", phone: "" });
  };

  const handleDelete = (id) => {
    socket.emit("deleteData", id);
  };

  const getEditData = (data) => {
    setFormInputs(data);
    setIsEdit(true);
  };

  const handleEdit = () => {
    socket.emit("editData", formInputs);
    setIsEdit(false);
    setFormInputs({
      name: "",
      age: "",
      phone: "",
    });
  };

  useEffect(() => {
    socket.on("crudData", (response) => {
      setCrudDataState(response);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h4>Crud Operations</h4>
      <div className="form-fields">
        <input
          name="name"
          className="input-field"
          placeholder="Enter your Name"
          onChange={handleInput}
          value={formInputs.name}
        />
        <input
          name="age"
          className="input-field"
          placeholder="Enter your Age"
          onChange={handleInput}
          value={formInputs.age}
        />
        <input
          name="phone"
          className="input-field"
          placeholder="Enter your phone number"
          onChange={handleInput}
          value={formInputs.phone}
        />
        <button
          onClick={isEdit ? handleEdit : handleSubmit}
          style={{
            margin: "12px 0",
            backgroundColor: "skyblue",
            color: "#fff",
          }}
        >
          {isEdit ? "Edit" : "Add"} User
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {crudDataState.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.phone}</td>
                <td>
                  <button onClick={() => getEditData(data)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(data?.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
