import Ascdesc from "./components/AscDesc";
import EvenOdd from "./components/EvenOdd";
import SearchQueryTable from "./components/SearchQueryTable";
import Users from "./components/Users";

function App() {
  return (
    <>
      <h1>React App</h1>
      <h2>Users</h2>
      <Users />
      <h2>AscDesc</h2>
      <Ascdesc />
      <h2>EvenOdd</h2>
      <EvenOdd />
      <h2>SearchQueryTable</h2>
      <SearchQueryTable />
    </>
  );
}

export default App;
