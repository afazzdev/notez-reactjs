import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import {
  createNoteAPI,
  editNoteAPI,
  getNoteByIdAPI,
  getNotesAPI,
  IResponseData,
} from "../../api";

export interface ITag {
  id?: string;
  value?: string;
  title?: string;
  [key: string]: any;
}

export interface INote {
  id?: string;
  image: string;
  title: string;
  content: string;
  tags: ITag[];
}

export const initialState = {
  notes: [] as INote[],
  dialog: false,
  note: {
    id: "",
    image: "",
    title: "",
    content: "",
    tags: [],
  } as INote,
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
      // get current note index
      const index = state.notes.findIndex((note) => note.id === payload.id);

      if (index !== -1) {
        // delete previous value
        state.notes.splice(index, 1);
      }
      // Assign new value
      state.notes.unshift(payload);

      // Return value current active note to initial and close it
      state.note = initialState.note;
      state.dialog = false;
    },
    getNotes(state, { payload }) {
      state.notes = payload;
    },
  },
});

// Public actions
export const { openDialog, closeDialog, editNote } = notesSlice.actions;

// Private actions
const { getNotes, saveNote } = notesSlice.actions;

export default notesSlice.reducer;

export const createNoteThunk = (
  data: INote,
): AppThunk<Promise<IResponseData<INote>>> => async (dispatch) => {
  // delete default id
  delete data.id;
  const note = await createNoteAPI<INote, IResponseData<INote>>(data);

  dispatch(saveNote(note.data));

  return note;
};

export const getNotesThunk = (): AppThunk => async (dispatch) => {
  const notes = await getNotesAPI<IResponseData<INote[]>>();

  dispatch(getNotes(notes.data));
};

export const editNoteThunk = (
  data: INote,
): AppThunk<Promise<IResponseData<INote>>> => async (dispatch) => {
  const editedNote = await editNoteAPI<INote, IResponseData<INote>>(
    data.id!,
    data,
  );

  dispatch(saveNote(editedNote.data));

  return editedNote;
};
