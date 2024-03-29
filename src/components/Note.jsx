import React from "react";

const Note = ({ id, message, removeMessage }) => {
  const handleRemoveMessage = () => {
    removeMessage(id);
  };

  return (
    <div id={id} className="note">
      Запись № {id}
      <div className="note-remove" onClick={handleRemoveMessage}>
        &#10060;
      </div>
      <div className="note-message">
        <div className="note__message__text">{message}</div>
      </div>
    </div>
  );
};

export default Note;
