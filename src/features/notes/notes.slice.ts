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
  id: string;
  image: string;
  title: string;
  body: string;
  tags: ITag[];
}

export const initialState = {
  notes: [] as INote[],
  dialog: false,
  note: {
    id: "",
    image: "",
    title: "",
    body: "",
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
      const index = state.notes.findIndex((note) => note.id === payload.id);
      const copyPayload = { ...payload };
      copyPayload.title = copyPayload?.title?.trim() ?? "";
      copyPayload.body = copyPayload?.body?.trim() ?? "";

      if (index === -1) {
        copyPayload.id = Math.random() + 100;
        state.notes.push(copyPayload);
      } else {
        state.notes[index] = copyPayload;
      }

      state.note = initialState.note;
      state.dialog = false;
    },
    getNotes(state, { payload }) {
      state.notes = payload;
    },
  },
});

export const {
  openDialog,
  closeDialog,
  editNote,
  saveNote,
} = notesSlice.actions;

const { getNotes } = notesSlice.actions;

export default notesSlice.reducer;

export const createNoteThunk = (
  data: INote,
): AppThunk<Promise<IResponseData<INote>>> => async (dispatch) => {
  // @ts-ignore
  delete data.id;

  return await createNoteAPI<INote, IResponseData<INote>>(data);
};

export const getNotesThunk = (): AppThunk => async (dispatch) => {
  const notes = await getNotesAPI<IResponseData<INote[]>>();

  dispatch(getNotes(notes.data));
};
