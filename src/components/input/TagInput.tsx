/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import NoSsr from "@material-ui/core/NoSsr";
import CheckIcon from "@material-ui/icons/Check";
import { isEqual, uniqBy } from "lodash";

import Tag from "../tag/Tag";
import InputWrapper from "../container/InputWrapper";
import Listbox from "../container/Listbox";

export interface IOption {
  title: string;
  value: string;
  [key: string]: any;
}

export interface ITagsInput {
  getValues: (tags: IOption[]) => void;
  options: IOption[];
  defaultValue: IOption[];
}

const filter = createFilterOptions<IOption>();

export default function TagsInput(props: ITagsInput) {
  const { getValues = (_) => {}, options = [], defaultValue } = props;
  const [opti, setOpti] = useState(options);

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "tags",
    defaultValue,
    multiple: true,
    options: opti,
    getOptionLabel: (option) => option.title,
    filterOptions(options, state) {
      const filtered = filter(options, state) as IOption[];
      const currentIndex = filtered.findIndex(
        (obj) => obj.title === state.inputValue,
      );

      if (state.inputValue !== "") {
        filtered.push({
          value: state.inputValue,
          title: state.inputValue,
        });
      }

      if (currentIndex !== -1) {
        delete filtered[currentIndex];
      }

      return filtered;
    },
    getOptionSelected(option, value) {
      return isEqual(option, value);
    },
    onChange(event, value, reason, details) {
      switch (reason) {
        case "select-option":
          // check if new object is already exist in "value"
          const unique = uniqBy(
            [
              ...opti,
              {
                ...details?.option!,
                title: details?.option.title.toLowerCase()!,
              },
            ],
            "title",
          );
          setOpti(unique);
          break;

        default:
          break;
      }
    },
    autoHighlight: true,
  });

  useEffect(() => {
    console.log(setAnchorEl);
    getValues(value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <NoSsr>
      <div>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
            {value.map((option: IOption, index: number) => (
              <Tag label={option.title} {...getTagProps({ index })} />
            ))}
            <input
              {...getInputProps()}
              style={{
                color: "inherit",
                background: "inherit",
              }}
              placeholder="Add tags..."
            />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.title}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}
