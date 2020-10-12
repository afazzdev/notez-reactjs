import { createSlice } from "@reduxjs/toolkit";

export interface ITag {
  id?: string;
  value?: string;
  title?: string;
  [key: string]: any;
}

export interface IDatum {
  id: string;
  image: string;
  title: string;
  body: string;
  tags: ITag[];
}

export const initialState = {
  notes: [] as IDatum[],
  dialog: false,
  note: {
    id: "",
    image: "",
    title: "",
    body: "",
    tags: [],
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
      const copyPayload = { ...payload };
      copyPayload.title = copyPayload.title.trim();
      copyPayload.body = copyPayload.body.trim();

      if (index === -1) {
        copyPayload.id = Math.random() + 100;
        state.notes.push(copyPayload);
      } else {
        state.notes[index] = copyPayload;
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
