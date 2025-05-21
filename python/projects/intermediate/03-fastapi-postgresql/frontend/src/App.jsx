import { useState } from "react";
import "./App.css";
import CreateQuestionForm from "./components/CreateQuestions";
import ShowQuestions from "./components/ShowQuestions";

function App() {
  const [toggle, setToggle] = useState(true);
  const handleChange = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <button onClick={handleChange}>
        {toggle ? "Create Questions" : "Play Quiz"}
      </button>
      {toggle ? <ShowQuestions /> : <CreateQuestionForm />}
    </>
  );
}

export default App;
