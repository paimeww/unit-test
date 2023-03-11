import { helperFilterListSC } from "helpers/suggestionContract";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionGenericName = ({ onChange, key, id }) => {
  const token = useSelector((state) => state.auth.token);
  const stateFilter = useSelector((state) => state.listSC.filter);
  const value = {
    label: stateFilter?.GenericName
      ? stateFilter?.GenericName?.length > 0
        ? stateFilter?.GenericName
        : "Select..."
      : "Select...",
    value: stateFilter?.GenericName ?? "",
  };

  const loadOptions = async (inputValue) => {
    if (token) {
      const data = await helperFilterListSC(inputValue, token);
      var listOptions = [];

      (data ?? []).map((item) => {
        var itemOption = { value: item.genericName, label: item.genericName };
        listOptions = [...listOptions, itemOption];
      });

      return listOptions;
    } else {
      return [];
    }
  };

  return (
    <Fragment>
      <AsyncSelect
        key={key}
        loadOptions={loadOptions}
        defaultOptions
        isClearable
        onChange={(value) => {
          onChange(value);
        }}
        value={value}
      />
    </Fragment>
  );
};

export default OptionGenericName;
