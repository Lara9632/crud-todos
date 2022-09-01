import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";

import "./App.css";

function AppUI() {
  const {
    error,
    loading,
    editTodo,
    addTodo,
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
  } = React.useContext(TodoContext);
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {error && <TodosError error={error} />}
        {loading && <TodosLoading />}
        {!loading && !searchedTodos.length && <EmptyTodos />}
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onUncomplete={() => uncompleteTodo(todo.text)}
            setOpenModal={setOpenModal}
            openModal={openModal}
            onDelete={() => deleteTodo(todo.text)}
            editTodoValue={editTodoValue}
            setEditTodoValue={setEditTodoValue}
            todoValue={todoValue}
            setTodoValue={setTodoValue}
          />
        ))}
      </TodoList>
      {!!openModal && (
        <Modal>
          <TodoForm /*onEditTodo={() => editTodo(todoValue)}*/ />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal} />
    </React.Fragment>
  );
}

export { AppUI };
