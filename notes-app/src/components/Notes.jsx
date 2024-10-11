import { Note } from "./Note";
import { CreateNote } from "./CreateNote";
import { HeaderNotes } from "./HeaderNotes";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./css/Note.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  const textHandler = (e) => {
    setInputText(e.target.value);
  };
  //get the saved notes and add them to the array

  // add new note to the state array
  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        text: inputText,
      },
    ]);
    //clear the textarea
    setInputText("");
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);

  //saving data to local storage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("Notes", JSON.stringify(notes));
    }
  }, [notes]);

  const [query, setQuery] = useState("");

  const searchParameters = Object.keys(Object.assign({}, ...notes));

  function search(notes) {
    return notes.filter((notes) =>
      searchParameters.some(
        (parameter) =>
          notes[parameter].toString().toLowerCase().includes(query) ||
          notes[parameter].toString().includes(query)
      )
    );
  }
  return (
    <>
      <HeaderNotes setQuery={setQuery} />
      <div className="notes">
        {search(notes).map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              deleteNote={deleteNote}
            />
          );
        })}
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
