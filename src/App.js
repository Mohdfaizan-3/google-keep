import { useContext, useEffect, useState } from "react";
import "./App.css";
import Form from "./Component/Form";
import { NotesContext } from "./store/notes-context";

function App() {
  let { notes, editNoteHandler } = useContext(NotesContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function openModal(selectedNote) {
    setModalTitle(selectedNote.title);
    setModalText(selectedNote.text);

    setModalOpen(true);
  }

  const closeModal = () => {
    editNoteHandler(selectedNote.id, selectedNote);

    setModalOpen(false);
    setModalTitle("");
    setModalText("");
    setSelectedNote(null);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    openModal(note);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setSelectedNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setModalTitle(selectedNote?.title);
    setModalText(selectedNote?.text);
  }

  const $modal = (
    <div className={`modal ${isModalOpen ? "open-modal" : ""}`}>
      <div className="modal-content">
        <input
          className="modal-title"
          placeholder="Title"
          type="text"
          name="title"
          value={modalTitle}
          onChange={(e) => handleChange(e)}
        />
        <input
          className="modal-text"
          placeholder="Take a note..."
          type="text"
          name="text"
          value={modalText}
          onChange={(e) => handleChange(e)}
        />
        <span className="modal-close-button" onClick={closeModal}>
          Close
        </span>
      </div>
    </div>
  );
  return (
    <div className="App">
      {$modal}
      <Form />
      <div id="notes">
        {notes.length === 0 ? (
          <h2>Empty</h2>
        ) : (
          notes.map((note) => (
            <div
              className="note"
              key={note.id}
              onClick={() => handleNoteClick(note)}
            >
              <div className={note.title && "note-title"}>{note.title}</div>
              <div className="note-text">{note.text}</div>
              <div className="toolbar-container">
                <div className="toolbar"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
