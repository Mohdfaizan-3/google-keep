import { createContext, useEffect, useReducer } from "react";

export const NotesContext = createContext({
  notes: [],
  addNotesHandler: () => {},
  editNoteHandler: () => {},
});

function notesReducer(state, action) {
  if (action.type === "ADD_NOTE") {
    const updatedNotes = [...state.notes];
    const newNote = {
      ...action.payload,
      id:
        updatedNotes.length > 0
          ? updatedNotes[updatedNotes.length - 1].id + 1
          : 1,
    };
    updatedNotes.push(newNote);
    return {
      ...state,
      notes: updatedNotes,
    };
  }

  if (action.type === "EDIT_NOTE") {
    const updatedNotes = [...state.notes];
    const updateNoteIndex = updatedNotes.findIndex(
      (note) => note.id === action.payload.id
    );
    const updatedNote = {
      ...updatedNotes[updateNoteIndex],
      ...action.payload.note,
    };
    updatedNotes.splice(updateNoteIndex, 1);
    updatedNotes.push(updatedNote);

    return { ...state, notes: updatedNotes };
  }

  if (action.type === "SET_NOTES") {
    return {
      ...state,
      notes: action.payload,
    };
  }
  

  return state;
}
export default function NotesContextProvider({ children }) {
  const [notes, notesDispatch] = useReducer(notesReducer, { notes: [] });

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    notesDispatch({
      type: "SET_NOTES",
      payload: storedNotes,
    });
  }, []);
  

  function addNotes(note) {
    notesDispatch({
      type: "ADD_NOTE",
      payload: note,
    });
  }

  function editNotes(id, note) {
    notesDispatch({
      type: "EDIT_NOTE",
      payload: {
        id,
        note,
      },
    });
  }

  const notesCtx = {
    notes: notes.notes,
    addNotesHandler: addNotes,
    editNoteHandler: editNotes,
  };
  return (
    <NotesContext.Provider value={notesCtx}>{children}</NotesContext.Provider>
  );
}
