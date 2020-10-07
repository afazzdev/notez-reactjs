import { createSlice } from "@reduxjs/toolkit";

export interface IDatum {
  id: string;
  image: string;
  title: string;
  body: string;
}

export const initialState = {
  notes: [] as IDatum[],
  dialog: false,
  note: {
    id: "",
    image: "",
    title: "",
    body: "",
  } as IDatum,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.dialog = true;
    },
    closeDialog: (state) => {
      state.note = initialState.note;
      state.dialog = false;
    },
    editNote: (state, { payload }) => {
      const index = state.notes.findIndex((note) => note.id === payload.id);

      state.note = state.notes[index];
      state.dialog = true;
    },
    saveNote: (state, { payload }) => {
      const index = state.notes.findIndex((note) => note.id === payload.id);
      if (index === -1) {
        payload.id = Math.random() + 100;
        state.notes.push(payload);
      } else {
        state.notes[index] = payload;
      }

      state.note = initialState.note;
      state.dialog = false;
    },
  },
});

export const {
  openDialog,
  closeDialog,
  editNote,
  saveNote,
} = notesSlice.actions;

export default notesSlice.reducer;
