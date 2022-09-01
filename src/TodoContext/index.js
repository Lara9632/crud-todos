import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = React.useState("");
  const [todoValue, setTodoValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [editTodoValue, setEditTodoValue] = React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos,
    newTodos = [];
  // let filterTodos = todos.filter((todo) => {
  //   return todo.text.toLowerCase().includes(searchValue.toLowerCase());
  // });

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      return todo.text.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  const editTodo = (text, newText) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    console.log(todoIndex);
    const newTodos = [...todos];
    newTodos[todoIndex] = {
      completed: false,
      text: newText,
    };
    console.log(newTodos);
    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);

    // esta es otra manera de hacerlo
    // const newTodos = [...todos];
    // todos[todoIndex] = {
    //   text: todos[todoIndex].text,
    //   completed: true,
    // setTodos(newTodos);
  };

  const uncompleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = false;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  // const findTodotext = (text) => {
  //   const todoIndex = todos.findIndex((todo) => todo.text === text);
  //   const newTodos = [...todos];
  //   setTodoText(newTodos[todoIndex].text);
  //   console.log("Hola ", newTodos[todoIndex].text);
  // };
  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        todos,
        totalTodos,
        completedTodos,
        addTodo,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        uncompleteTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        editTodoValue,
        setEditTodoValue,
        todoValue,
        setTodoValue,
        editTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
