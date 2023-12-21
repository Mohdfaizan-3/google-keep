import React, { useContext, useState } from "react";
import { NotesContext } from "../store/notes-context";

const Form = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const { addNotesHandler } = useContext(NotesContext);

  function handleFormClick() {
    setFormOpen(true);
  }

  function handleCloseForm() {
    setFormOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNotesHandler(formData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
        color: "white",
      };
    });
  }

  return (
    <div>
     
      <main>
        <header>
          <img
            className="header-logo"
            src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
            alt="logo"
          />
          <h2 className="header-title">Keep</h2>
        </header>

        <div id="form-container">
          <form
            id="form"
            autoComplete="off"
            className={isFormOpen ? "form-open" : ""}
          >
            <input
              id="note-title"
              placeholder="Title"
              type="text"
              style={{ display: isFormOpen ? "block" : "none" }}
              name="text"
              value={formData.text}
              onChange={handleChange}
            />
            <input
              onClick={handleFormClick}
              id="note-text"
              placeholder="Take a note..."
              type="text"
              className={isFormOpen ? "form-open" : ""}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <div
              id="form-buttons"
              style={{ display: isFormOpen ? "block" : "none" }}
            >
              <button
                type="submit"
                id="submit-button"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
              <button
                type="button"
                id="form-close-button"
                onClick={() =>handleCloseForm()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Form;
