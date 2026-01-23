import Ascdesc from "./components/AscDesc";
import Counter from "./components/Counter/Counter";
import EvenOdd from "./components/EvenOdd";
import SearchQueryTable from "./components/SearchQueryTable";
import Test from "./components/Test/Test";
import Users from "./components/Users";

function App() {
  return (
    <>
      <p>npm create vite@latest</p>
      <Test />
      <h1>React App</h1>
      <h2>Users</h2>
      <Users />
      <h2>AscDesc</h2>
      <Ascdesc />
      <h2>EvenOdd</h2>
      <EvenOdd />
      <h2>SearchQueryTable</h2>
      <SearchQueryTable />
      <h2>Counter</h2>
      <Counter />
    </>
  );
}

export default App;
