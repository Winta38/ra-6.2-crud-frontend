import React, { useState, useEffect } from "react";
import Note from "./Note";

const DEFAULT_MESSAGE = {
  message: "",
};

const serverURL = "http://localhost:7070/notes";

function AddNote() {
  const [notes, setNotes] = useState([]);
  const [noteObj, setNoteObj] = useState(DEFAULT_MESSAGE);

  useEffect(() => {
    getNoteList();
  }, []);

  const getNoteList = () => {
    fetch(serverURL)
      .then((response) => response.json())
      .then((notes) => setNotes(notes))
      .catch((error) => console.error("Error fetching notes:", error));
  };

  const changeSubmit = (evt) => {
    setNoteObj({
      message: evt.target.value,
    });
  };

  const addNote = (evt) => {
    evt.preventDefault();
    fetch(serverURL, {
      method: "POST",
      body: JSON.stringify(noteObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getNoteList();
      setNoteObj(DEFAULT_MESSAGE);
    });
  };

  const removeMessage = (id) => {
    fetch(`${serverURL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      getNoteList();
    });
  };

  const refreshNotes = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <div className="note__list">
        {notes.map((item) => (
          <Note
            key={item.id}
            id={item.id}
            message={item.message}
            removeMessage={removeMessage}
          />
        ))}
      </div>
      <div className="main">
        <h2>Новая запись</h2>
        <button className="refresh-button" onClick={refreshNotes}>
          &#8635;
        </button>
        <form className="add-note" onSubmit={addNote}>
          <textarea
            placeholder="Введите сообщение"
            type="text"
            className="add-note-input"
            value={noteObj.message}
            onChange={changeSubmit}
          />
          <button type="submit" className="add-note-button"></button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AddNote;
