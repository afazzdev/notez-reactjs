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
  IconButton,
} from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";

import { AppDispatchType } from "../../app/store";
import { RootState } from "../../app/root.reducer";

import {
  closeDialog,
  createNoteThunk,
  editNoteThunk,
  deleteNoteThunk,
} from "../notes/notes.slice";

import TextArea from "../../components/input/TextArea";
// import TagInput, { IOption } from "../../components/input/TagInput";

// change modal component to <form />
const FormPaper = (props: PaperProps) => <Paper component="form" {...props} />;

export default function ContentEditDialog() {
  const { dialog, note } = useSelector(
    (state: RootState) => state.notes,
    shallowEqual,
  );
  const dispatch = useDispatch<AppDispatchType>();

  const [state, setState] = useState(note);
  useEffect(() => {
    setState(note);
  }, [note, dialog]);

  const handleClose = () => dispatch(closeDialog());

  /**
   * Loading for submit = pending
   */
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // handler for creating new note
  const handleCreateNote = () => dispatch(createNoteThunk(state));
  // handler from editing note
  const handleEditNote = () => dispatch(editNoteThunk(state));
  // handle delete note
  const handleDeleteNote = () => dispatch(deleteNoteThunk(state.id));

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const deleteButton = e.currentTarget.getAttribute("name") === "delete";
    e.preventDefault();
    if (deleteButton) {
      setDeleteLoading(true);
    } else {
      setLoading(true);
    }
    console.log(deleteButton);
    let method:
      | typeof handleCreateNote
      | typeof handleEditNote
      | typeof handleDeleteNote;

    if (deleteButton) {
      method = handleDeleteNote;
    } else if (state.id) {
      method = handleEditNote;
    } else {
      method = handleCreateNote;
    }

    method().finally(() => {
      if (deleteButton) {
        setDeleteLoading(false);
      } else {
        setLoading(false);
      }
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
      handleSubmit(e as any);
      // add return so focus not change to next field
      return;
    }

    // Change Input focus to next field with "Enter"
    if (e.key === "Enter") {
      e.preventDefault();
      // const form = (e.target as HTMLFormElement).form;
      // const index = Array.prototype.indexOf.call(form, e.target);
      // form.elements[index + 1].focus();
    }
  };

  const EndAdornment = () => (
    <IconButton
      size="small"
      {...(state.favorite && { color: "secondary" })}
      onClick={() => {
        setState((prev) => ({
          ...prev,
          favorite: !prev.favorite,
        }));
      }}
    >
      {state.favorite ? (
        <Star style={{ fontSize: 24 }} />
      ) : (
        <StarBorder style={{ fontSize: 24 }} />
      )}
    </IconButton>
  );

  return (
    <Dialog
      open={dialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      PaperComponent={FormPaper}
      onSubmit={handleSubmit}
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
          endAdornment={<EndAdornment />}
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
          onKeyPress={(e) => {
            e.preventDefault();
            handleSubmit(e as any);
          }}
        />
        {/* <TagInput
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
        /> */}
      </DialogContent>
      <DialogActions>
        {state.id && (
          <Button
            color="secondary"
            name="delete"
            onClick={
              (handleSubmit as unknown) as (
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
              ) => void
            }
          >
            {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        )}
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" variant="contained">
          {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
