import React from "react";
import ReactDOM from "react-dom"; //Para el modal no usamos react-dom/client
import "./Modal.css";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="ModalBackground">{children}</div>,
    document.getElementById("modal")
  );
}

export { Modal };
