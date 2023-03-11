import { helperFilterListCA } from "helpers/contractApproval";
import { debounce } from "helpers/utils";
import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionVendor = ({ onChange, key, id }) => {
  const token = useSelector((state) => state.auth.token);
  const [optionsData, setOptionsData] = useState([]);
  const stateFilter = useSelector((state) => state.contractApproval.filter);
  const listCA = useSelector(
    (state) => state.contractApproval.response?.data ?? []
  );
  const value = {
    label: stateFilter?.VendorName
      ? stateFilter?.VendorName?.length > 0
        ? stateFilter?.VendorName
        : "Select..."
      : "Select...",
    value: stateFilter?.VendorName ?? "",
  };

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var isExist = listOptions.filter((el) => el.value == item.vendorName);
      if (isExist.length == 0) {
        var itemOption = {
          value: item.vendorName,
          label: item.vendorName,
        };
        listOptions = [...listOptions, itemOption];
      }
    });

    return listOptions;
  };

  const loadOptionsDebounced = useCallback(
    debounce(async (inputValue, callback) => {
      if (token && inputValue != "") {
        helperFilterListCA(inputValue, token).then(async (data) => {
          return callback(await loadOptions(data));
        });
      } else {
        return callback(await loadOptions(listCA));
      }
    }, 2000),
    []
  );

  return (
    <Fragment>
      <AsyncSelect
        instanceId={"OptionVendor"}
        loadOptions={loadOptionsDebounced}
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

export default OptionVendor;
