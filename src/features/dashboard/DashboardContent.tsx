// Libs
import React from "react";
import { useSelector } from "react-redux";

// Data
import { RootState } from "../../app/root.reducer";
import { INote } from "../notes/notes.slice";

// Components
import { ContentDisplay, ContentEditDialog } from "../contents";

function DashboardContent({ onEdit }: { onEdit: (note: INote) => void }) {
  const notes = useSelector((state: RootState) => state.notes.notes);

  console.log("dashboard content rerender");
  return (
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
            onEdit(note);
          }}
          {...note}
        />
      ))}
      <ContentEditDialog />
    </div>
  );
}

export default DashboardContent;
