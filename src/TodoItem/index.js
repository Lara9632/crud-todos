import React from "react";
import "./TodoItem.css";
import deleteIcon from "../images/delete-icon.svg";
import checkIcon from "../images/check-icon.png";
import editIcon from "../images/edit-icon.svg";
import checkedIcon from "../images/checked-icon.png";

function TodoItem(props) {
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const onClickEditButton = () => {
    props.setOpenModal((prevState) => !prevState);
    props.setEditTodoValue((prevState) => !prevState);
    props.setTodoValue(props.text);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <li
      className="TodoItem"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span
        className={`Icon Icon-check ${props.completed && "Icon-check--active"}`}
        onClick={props.completed ? props.onUncomplete : props.onComplete}
      >
        <img src={props.completed ? checkedIcon : checkIcon} alt="Check icon" />
      </span>
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      {isHovering && (
        <span className="Icon Icon-delete">
          <img src={editIcon} alt="Edit icon" onClick={onClickEditButton} />
          <img src={deleteIcon} alt="Delete icon" onClick={props.onDelete} />.
        </span>
      )}
    </li>
  );
}

export { TodoItem };
