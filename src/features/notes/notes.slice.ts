import { createSlice } from "@reduxjs/toolkit";
import { omitBy, isEmpty } from "lodash";

import { AppThunk } from "../../app/store";
import {
  createNoteAPI,
  editNoteAPI,
  // getNoteByIdAPI,
  getNotesAPI,
  GetNotesFilter,
  deleteNoteAPI,
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
    getNotes(state, { payload }) {
      state.notes = payload;
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
        // delete previous value (and moving to index 0)
        state.notes.splice(index, 1);
      }

      // Assign new value
      if (state.filter === "favorite") {
        state.notes = state.notes.filter((note) => note.favorite);
      } else {
        state.notes.unshift(payload);
      }
    },
    deleteNote(state, { payload }) {
      // NOTE: Array.prototype.filter DOES NOT MUTATE ARRAY!
      state.notes = state.notes.filter((note) => note.id !== payload);
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
const { getNotes, saveNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;

/**
 * Thunk actions
 */
export const createNoteThunk = (
  data: Partial<INote>,
): AppThunk<Promise<IResponseData<INote>>> => async (dispatch) => {
  const note = await createNoteAPI<INote, IResponseData<INote>>(
    (omitBy(data, isEmpty) as unknown) as INote,
  );

  dispatch(saveNote(note.data));
  dispatch(closeDialog());

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
  dispatch(closeDialog());

  return editedNote;
};

export const deleteNoteThunk = (id: string): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  await deleteNoteAPI(id);

  dispatch(deleteNote(id));
  dispatch(closeDialog());

  return;
};

export const changeRouteThunk = (
  route: NoteFilter,
  filter: Partial<GetNotesFilter>,
): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch(changeRoute(route));
  dispatch(getNotesThunk(filter));
};
