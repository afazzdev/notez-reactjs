import React, { useState } from "react";
import List from "@material-ui/core/List";
import NotesIcon from "@material-ui/icons/Notes";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LabelIcon from "@material-ui/icons/Label";
import MoreIcon from "@material-ui/icons/More";
import ListButton, { IListButtonData } from "../../components/list/ListButton";
import { isEqual } from "lodash";

export default function NestedList() {
  const [state, setState] = useState<IListButtonData>([]);
  const [loading, setLoading] = useState(false);

  const handleAsync = async () => {
    if (state.length === 0) {
      setLoading(true);
    }
    console.log(loading);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            icon: LabelIcon,
            label: "Some tag name",
          },
        ]);
      }, 5000);
    })
      .then((res) => {
        if (!isEqual(res, state)) {
          setState(res as IListButtonData);
          console.log(state);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <List component="nav">
      <ListButton icon={NotesIcon} label="Notes" />
      <ListButton icon={StarBorderIcon} label="Favorites" />
      <ListButton
        icon={MoreIcon}
        label="Tags"
        onClick={(e, label) => {
          handleAsync();
        }}
        loading={loading}
        data={state}
      />
    </List>
  );
}
