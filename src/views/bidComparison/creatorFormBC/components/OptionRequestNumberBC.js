import { helperFilterListBC } from "helpers/bidComparison";
import { debounce } from "helpers/utils";
import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionRequestNumberBC = ({ onChange, key, id, token }) => {
  const [value, setValue] = useState({
    label: "Select...",
    value: "",
  });

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var isExist = listOptions.filter(
        (element) => element.value == item.requestNumber
      );
      if (isExist.length == 0) {
        var itemOption = {
          value: item.requestNumber,
          label: item.requestNumber,
        };
        listOptions = [...listOptions, itemOption];
      }
    });

    return listOptions;
  };

  const loadOptionsDebounced = useCallback(
    debounce(async (inputValue, callback) => {
      if (token) {
        helperFilterListBC(inputValue, token).then(async (data) => {
          return callback(await loadOptions(data));
        });
      } else {
        console.log("no token");
        return callback(await loadOptions([]));
      }
    }, 2000),
    []
  );

  return (
    <Fragment>
      <AsyncSelect
        instanceId={"OptionRequestNumberBC"}
        loadOptions={loadOptionsDebounced}
        defaultOptions
        isClearable
        onChange={(value) => {
          setValue(value);
          onChange(value);
        }}
        value={value}
      />
    </Fragment>
  );
};

export default OptionRequestNumberBC;
