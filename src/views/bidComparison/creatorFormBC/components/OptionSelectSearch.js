import React, { Fragment, useState } from "react";
import { Item } from "react-contexify";

import Select from "react-select";

const colourOptions = [
  { value: "", label: "value 1" },
  { value: "", label: "value 2" },
  { value: "", label: "value 3" },
];

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const OptionSelectSearch = ({
  showOption,
  clearable,
  disable,
  loading,
  rtl,
  searchable,
  onChange,
  item,
}) => {
  const [isClearable, setIsClearable] = useState(clearable);
  const [isDisabled, setIsDisabled] = useState(disable);
  const [isLoading, setIsLoading] = useState(loading);
  const [isRtl, setIsRtl] = useState(rtl);
  const [isSearchable, setIsSearchable] = useState(searchable);

  const toggleClearable = () => {
    setIsClearable(!isClearable);
  };

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const toggleRtl = () => {
    setIsRtl(!isRtl);
  };

  const toggleSearchable = () => {
    setIsSearchable(!isSearchable);
  };

  return (
    <Fragment>
      <Select
        instanceId={"OptionSelectSearch"}
        className="basic-single"
        classNamePrefix="select"
        defaultValue={colourOptions[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={colourOptions}
        onChange={onChange}
      />
      {showOption && (
        <div
          style={{
            color: "hsl(0, 0%, 40%)",
            display: "inline-block",
            fontSize: 12,
            fontStyle: "italic",
            marginTop: "1em",
          }}
        >
          <Checkbox checked={isClearable} onChange={toggleClearable}>
            Clearable
          </Checkbox>
          <Checkbox checked={isSearchable} onChange={toggleSearchable}>
            Searchable
          </Checkbox>
          <Checkbox checked={isDisabled} onChange={toggleDisabled}>
            Disabled
          </Checkbox>
          <Checkbox checked={isLoading} onChange={toggleLoading}>
            Loading
          </Checkbox>
          <Checkbox checked={isRtl} onChange={toggleRtl}>
            RTL
          </Checkbox>
        </div>
      )}
    </Fragment>
  );
};

export default OptionSelectSearch;
