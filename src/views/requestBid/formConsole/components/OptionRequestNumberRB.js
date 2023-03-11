import { helperFilterListRB } from "helpers/requestBid";
import { debounce } from "helpers/utils";
import React, { Fragment, useCallback, useState } from "react";
import AsyncSelect from "react-select/async";

const OptionRequestNumberRB = ({ onChange, key, id, token }) => {
  const [value, setValue] = useState({
    label: "Select...",
    value: "",
  });

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var isExist = listOptions.filter((el) => el.label == item.requestNumber);
      if (isExist.length == 0) {
        var itemOption = {
          value: item.id,
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
        helperFilterListRB(inputValue, token).then(async (data) => {
          return callback(await loadOptions(data));
        });
      } else {
        return callback(await loadOptions([]));
      }
    }, 2000),
    []
  );

  return (
    <Fragment>
      <AsyncSelect
        instanceId={"OptionRequestNumberRB"}
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

export default OptionRequestNumberRB;
