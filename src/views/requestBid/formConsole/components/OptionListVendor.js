import { helperOptionListRB } from "helpers/requestBid";
import { debounce } from "helpers/utils";
import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionListVendor = ({ onChange, key, id, listBidContracts }) => {
  const token = useSelector((state) => state.auth.token);
  const [value, setValue] = useState({
    label: "Select...",
    value: "",
  });

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var vendorHasAdded = listBidContracts.filter(
        (el) => el.vendorName == item.name
      );
      var isExist = listOptions.filter((el) => el.value == item.name);
      if (isExist.length == 0 && vendorHasAdded.length == 0) {
        var itemOption = {
          value: item.name ?? "",
          label: item.name ?? "",
          id: item.id ?? "",
        };
        listOptions = [...listOptions, itemOption];
      }
    });

    return listOptions;
  };

  const loadOptionsDebounced = useCallback(
    debounce(async (inputValue, callback) => {
      if (token) {
        helperOptionListRB(inputValue, token).then(async (data) => {
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
        instanceId={"OptionListVendor"}
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

export default OptionListVendor;
