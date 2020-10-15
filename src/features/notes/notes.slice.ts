import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import {
  createNoteAPI,
  editNoteAPI,
  // getNoteByIdAPI,
  getNotesAPI,
  GetNotesFilter,
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
  title: string;
  content: string;
  favorite: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;

  // image: string;
  // tags: ITag[];
}

export type NoteFilter = "notes" | "favorite";

interface InitialState {
  notes: INote[];
  filter: NoteFilter;
  dialog: boolean;
  note: INote;
}

export const initialState: InitialState = {
  notes: [],
  filter: "notes",
  dialog: false,
  note: {
    id: "",
    title: "",
    content: "",
    favorite: false,
    userId: "",
    createdAt: "",
    updatedAt: "",
    // image: "",
    // tags: [],
  },
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
      if (state.filter === "favorite") {
        state.notes = state.notes.filter((note) => note.favorite);
      } else {
        state.notes.unshift(payload);
      }

      // Return value current active note to initial and close it
      state.note = initialState.note;
      state.dialog = false;
    },
    getNotes(state, { payload }) {
      state.notes = payload;
    },
    changeRoute(state, { payload }) {
      state.filter = payload;
    },
  },
});

// Public actions
export const {
  openDialog,
  closeDialog,
  editNote,
  changeRoute,
} = notesSlice.actions;

// Private actions
const { getNotes, saveNote } = notesSlice.actions;

export default notesSlice.reducer;

export const createNoteThunk = (
  data: Partial<INote>,
): AppThunk<Promise<IResponseData<INote>>> => async (dispatch) => {
  // delete default id
  delete data.id;
  const note = await createNoteAPI<INote, IResponseData<INote>>(data as INote);

  dispatch(saveNote(note.data));

  return note;
};

export const getNotesThunk = (
  filter: Partial<GetNotesFilter>,
): AppThunk<Promise<void>> => async (dispatch) => {
  const notes = await getNotesAPI<IResponseData<INote[]>>(filter);

  dispatch(getNotes(notes.data));

  return;
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

export const changeRouteThunk = (
  route: NoteFilter,
  filter: Partial<GetNotesFilter>,
): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch(changeRoute(route));
  dispatch(getNotesThunk(filter));
};
