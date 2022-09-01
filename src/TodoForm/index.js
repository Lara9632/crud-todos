import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

function TodoForm() {
  const [newTodoValue, setNewTodoValue] = React.useState("");
  const {
    editTodo,
    addTodo,
    setOpenModal,
    editTodoValue,
    setEditTodoValue,
    todoValue,
    setTodoValue,
  } = React.useContext(TodoContext);
  const defaultText = todoValue;

  const onChange = (event) => {
    editTodoValue
      ? setTodoValue(event.target.value)
      : setNewTodoValue(event.target.value);
  };

  const onCancel = () => {
    setOpenModal(false);
    if (editTodoValue) {
      setEditTodoValue(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    editTodoValue ? editTodo(defaultText, todoValue) : addTodo(newTodoValue);
    setOpenModal(false);
    if (editTodoValue) {
      setEditTodoValue(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>{editTodoValue ? "Editar Todo" : "Escribe tu nuevo TODO"}</label>
      <textarea
        onChange={onChange}
        value={`${editTodoValue ? todoValue : newTodoValue}`}
        placeholder="Cortar la cebolla para el almuerzo"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          onClick={onCancel}
          className="TodoForm-button TodoForm-button--cancel"
        >
          Cancelar
        </button>

        <button type="submit" className="TodoForm-button TodoForm-button--add">
          Añadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
