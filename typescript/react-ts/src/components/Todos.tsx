import React from "react";
import Todo from "../models/todo";
import TodoItems from "./TodoItem";
import classes from "./Todos.module.css";

const Todos: React.FC<{ items: Todo[]; onRemoveTodo: (id: string) => void }> = (
  props
) => {
  return (
    <ul className={classes.todos}>
      {props.items.map((item) => (
        <TodoItems
          key={item.id}
          text={item.text}
          onRemove={props.onRemoveTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
