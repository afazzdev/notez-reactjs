import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/root.reducer";
import { ContentDisplay, ContentEditDialog } from "../contents";

function DashboardContent({ maxHeight }: { maxHeight: number }) {
  const notes = useSelector((state: RootState) => state.notes.notes);

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
          <ContentDisplay key={note.id} {...note} />
        ))}
        <ContentEditDialog />
      </div>
    </div>
  );
}

export default DashboardContent;
