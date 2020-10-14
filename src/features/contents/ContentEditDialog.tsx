import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Paper,
  PaperProps,
  Button,
  InputBase,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";

import { AppDispatchType } from "../../app/store";
import { RootState } from "../../app/root.reducer";

import {
  closeDialog,
  createNoteThunk,
  editNoteThunk,
} from "../notes/notes.slice";

import TextArea from "../../components/input/TextArea";
import TagInput, { IOption } from "../../components/input/TagInput";

// change modal component to <form />
const FormPaper = (props: PaperProps) => <Paper component="form" {...props} />;

export default function ContentEditDialog() {
  const { dialog, note } = useSelector(
    (state: RootState) => state.notes,
    shallowEqual,
  );
  const dispatch = useDispatch<AppDispatchType>();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(note);
  useEffect(() => {
    setState(note);
  }, [note, dialog]);

  const handleClose = () => dispatch(closeDialog());

  // handler for creating new note
  const handleCreateNote = () => dispatch(createNoteThunk(state));
  // handler from editing note
  const handleEditNote = () => dispatch(editNoteThunk(state));

  const handleSave = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setLoading(true);
    let method: typeof handleCreateNote | typeof handleEditNote;

    if (state.id) {
      method = handleEditNote;
    } else {
      method = handleCreateNote;
    }

    method().finally(() => {
      setLoading(false);
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLDivElement
    >,
  ) => {
    // Add new line
    if (e.shiftKey && e.key === "Enter") {
      // add return so submit not fired
      return;
    }

    if (e.ctrlKey && e.key === "Enter") {
      handleSave(e as any);
      // add return so focus not change to next field
      return;
    }

    // Change Input focus to next field with "Enter"
    if (e.key === "Enter") {
      e.preventDefault();
      const form = (e.target as HTMLFormElement).form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  return (
    <Dialog
      open={dialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      PaperComponent={FormPaper}
      onSubmit={handleSave}
    >
      <DialogContent>
        <InputBase
          autoFocus
          fullWidth
          autoComplete="new-password"
          id="title"
          name="title"
          type="text"
          placeholder="Title..."
          margin="dense"
          value={state.title}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={(event) => {
            event.target.setAttribute("autocomplete", "off");
          }}
          style={{
            fontSize: "1.2rem",
            paddingBottom: "2rem",
          }}
        />
        <TextArea
          autoComplete="content"
          aria-label="content"
          placeholder="Notes..."
          name="content"
          value={state.content}
          rows={15}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <TagInput
          options={[
            {
              title: "sometitle",
              value: "some value",
            },
          ]}
          defaultValue={state.tags as IOption[]}
          getValues={(values) => {
            console.log(values);
            setState({
              ...state,
              tags: values,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
