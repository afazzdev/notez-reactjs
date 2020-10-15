import React from "react";
import List from "@material-ui/core/List";
import NotesIcon from "@material-ui/icons/Notes";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ListButton from "../../components/list/ListButton";
import { RootState } from "../../app/root.reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType } from "../../app/store";
import { changeRoute, NoteFilter } from "../notes/notes.slice";

function Sidebar() {
  const filter = useSelector((state: RootState) => state.notes.filter);
  const dispatch = useDispatch<AppDispatchType>();

  const handleChangeRoute = (route: NoteFilter) => {
    dispatch(changeRoute(route));
  };

  return (
    <List component="nav">
      <ListButton
        icon={NotesIcon}
        label="Notes"
        selected={filter === "notes"}
        onClick={() => handleChangeRoute("notes")}
      />
      <ListButton
        icon={StarBorderIcon}
        label="Favorites"
        selected={filter === "favorite"}
        onClick={() => handleChangeRoute("favorite")}
      />
      {/* <ListButton
        icon={{
          parent: MoreIcon,
          child: LabelIcon,
        }}
        label="Tags"
        onClick={(e, label) => {
          console.log("clicked");
          handleAsync();
        }}
        loading={loading}
        data={state}
      /> */}
    </List>
  );
}
export default Sidebar;
