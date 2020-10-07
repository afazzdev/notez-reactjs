import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { RootState } from "../../app/root.reducer";

import { closeDialog, saveNote } from "../notes/notes.slice";

import TextArea from "../../components/input/TextArea";

export default function ContentEditDialog() {
  const { dialog, note } = useSelector(
    (state: RootState) => state.notes,
    shallowEqual,
  );
  const dispatch = useDispatch();

  const [state, setState] = useState(note);
  useEffect(() => {
    setState(note);
  }, [note, dialog]);

  const handleClose = () => dispatch(closeDialog());

  const handleSave = () => dispatch(saveNote(state));

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
    if (e.shiftKey && e.key === "Enter") {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog
      open={dialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        <input type="hidden" value="name" />
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
          }}
        />
      </DialogTitle>
      <DialogContent>
        <TextArea
          autoComplete="body"
          aria-label="body"
          rowsMin={3}
          placeholder="Notes..."
          name="body"
          value={state.body}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} type="submit" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
