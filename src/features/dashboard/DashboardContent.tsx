import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/root.reducer";
import { ContentDisplay, ContentEditDialog } from "../contents";
import { editNote } from "../notes/notes.slice";

function DashboardContent({ maxHeight }: { maxHeight: number }) {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        overflow: "auto",
        maxHeight,
      }}
    >
      <div
        style={{
          columns: "3 200px",
          columnGap: "1rem",
          padding: "1rem",
        }}
      >
        {notes.map((note) => (
          <ContentDisplay
            key={note.id}
            onClick={() => {
              dispatch(editNote(note));
            }}
            {...note}
          />
        ))}
        <ContentEditDialog />
      </div>
    </div>
  );
}

export default DashboardContent;
