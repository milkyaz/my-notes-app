// store/notesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    inputText: "",
  },
  reducers: {
    addNote: (state) => {
      state.notes.push({
        id: nanoid(),
        text: state.inputText,
      });
      state.inputText = "";
    },
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { addNote, setInputText, deleteNote, setNotes } =
  notesSlice.actions;
export default notesSlice.reducer;
