import React, { useState } from "react";
import List from "@material-ui/core/List";
import NotesIcon from "@material-ui/icons/Notes";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LabelIcon from "@material-ui/icons/Label";
import MoreIcon from "@material-ui/icons/More";
import ListButton, { IListButtonData } from "../../components/list/ListButton";
import { isEqual } from "lodash";

const data = [
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
  {
    label: "Some tag name",
  },
];

function Sidebar({ maxHeight }: { maxHeight: number }) {
  const [state, setState] = useState<IListButtonData>([]);
  const [loading, setLoading] = useState(false);

  const handleAsync = async () => {
    if (state.length === 0) {
      setLoading(true);
    }
    console.log(loading);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
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
    <List
      component="nav"
      style={{
        overflow: "auto",
        maxHeight,
      }}
    >
      <ListButton icon={NotesIcon} label="Notes" />
      <ListButton icon={StarBorderIcon} label="Favorites" />
      <ListButton
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
      />
    </List>
  );
}
export default Sidebar;
