import React, { useRef } from "react";
import classes from "./NewTodo.module.css";

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
  const todoTextRef = useRef<HTMLInputElement>(null);
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = todoTextRef.current!.value;
    if (enteredText?.trim().length === 0) {
      return;
    }
    props.onAddTodo(enteredText);
  };
  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <label htmlFor="todos">Todos</label>
      <input type="text" id="todos" ref={todoTextRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
