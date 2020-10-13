import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { RootState } from "../../app/root.reducer";

import { closeDialog, createNoteThunk, saveNote } from "../notes/notes.slice";

import TextArea from "../../components/input/TextArea";
import TagInput, { IOption } from "../../components/input/TagInput";
import { AppDispatchType } from "../../app/store";
import { CircularProgress } from "@material-ui/core";

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

  const handleSave = async () => {
    setLoading(true);
    dispatch(createNoteThunk(state)).then((res) => {
      dispatch(saveNote(res.data));
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
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleSave} type="submit" color="primary">
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
