import React, { useState } from "react";
import css from "./AddCardModal.module.css";
import Rodal from "rodal";

const AddCardModal = ({ visible, onClose, handleCardAdd }) => {
  const customStyle = {
    background: "rgb(58 58 58)",
    padding: "20px",
    width: "50%",
    height: "fit-content",
    maxWidth: "40rem",
  };

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleAdd = () => {
    handleCardAdd(title.trim(), detail.trim());
    setTitle("");
    setDetail("");
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={customStyle}>
      <div className={css.container}>
        <div>
          <span className={css.label}>Card Title</span>
          <input
            type="text"
            className={css.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <span className={css.label}>Detail</span>
          <textarea
            rows={10}
            className={css.input} 
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <button
          className={css.saveButton}
          disabled={!title.trim() || !detail.trim()}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </Rodal>
  );
};

export default AddCardModal;
