/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import NoSsr from "@material-ui/core/NoSsr";
import CheckIcon from "@material-ui/icons/Check";
import { difference, differenceWith, isEqual } from "lodash";

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
}

export default function TagsInput(props: ITagsInput) {
  const { getValues = (_) => {}, options = [] } = props;
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
    inputValue,
  } = useAutocomplete({
    id: "tags",
    // defaultValue: [top100Films[1]],
    multiple: true,
    options: opti,
    getOptionLabel: (option) => option.title,
  });

  useEffect(() => {
    getValues(value);
  }, [value, getValues]);

  useEffect(() => {
    if (inputValue.length > 0 && !opti.find((el) => el?.title === inputValue)) {
      setOpti([
        ...opti,
        {
          title: inputValue,
          value: inputValue.toLowerCase(),
        },
      ]);
    }
  }, [opti, setOpti, inputValue]);

  useEffect(() => {
    setOpti(
      difference(opti, differenceWith(opti, [...options, ...value], isEqual)),
    );
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
