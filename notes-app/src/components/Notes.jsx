import { Note } from "./Note";
import { CreateNote } from "./CreateNote";
import { HeaderNotes } from "./HeaderNotes";
import { useState, useEffect } from "react";
import "./css/Note.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  setInputText,
  deleteNote,
  setNotes,
} from "../store/notesSlice";

function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes) || [];
  const inputText = useSelector((state) => state.notes.inputText);

  const textHandler = (e) => {
    dispatch(setInputText(e.target.value));
  };

  const saveHandler = () => {
    dispatch(addNote());
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      dispatch(setInputText(data.inputText));
      dispatch(setNotes(data.notes));
    }
  }, [dispatch]);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("Notes", JSON.stringify({ notes }));
    }
  }, [notes]);

  const [query, setQuery] = useState("");

  const searchParameters = Object.keys(Object.assign({}, ...notes));

  function search(notes) {
    return notes.filter((note) =>
      searchParameters.some(
        (parameter) =>
          note[parameter].toString().toLowerCase().includes(query) ||
          note[parameter].toString().includes(query)
      )
    );
  }

  return (
    <>
      <HeaderNotes setQuery={setQuery} />
      <div className="notes">
        {search(notes).map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            deleteNote={handleDeleteNote}
          />
        ))}
        <CreateNote
          textHandler={textHandler}
          saveHandler={saveHandler}
          inputText={inputText}
        />
      </div>
    </>
  );
}

export { Notes };
