import { helperFilterListSC } from "helpers/suggestionContract";
import { debounce } from "helpers/utils";
import moment from "moment";
import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionManufacture = ({ onChange, key, id, listSC }) => {
  const token = useSelector((state) => state.auth.token);
  const stateFilter = useSelector((state) => state.listSC.filter);
  const value = {
    label: stateFilter?.Manufacture
      ? stateFilter?.Manufacture?.length > 0
        ? stateFilter?.Manufacture
        : "Select..."
      : "Select...",
    value: stateFilter?.Manufacture ?? "",
  };

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var isExist = listOptions.filter((el) => el.value == item.manufacture);
      if (isExist.length == 0) {
        var itemOption = {
          value: item.manufacture,
          label: item.manufacture,
        };
        listOptions = [...listOptions, itemOption];
      }
    });

    return listOptions;
  };

  const loadOptionsDebounced = useCallback(
    debounce(async (inputValue, callback) => {
      if (token && inputValue != "") {
        helperFilterListSC(inputValue, token, "manufacture").then(
          async (data) => {
            return callback(await loadOptions(data));
          }
        );
      } else {
        return callback(await loadOptions(listSC));
      }
    }, 2000),
    []
  );

  return (
    <Fragment>
      <AsyncSelect
        instanceId={"OptionItemDescription"}
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

export default OptionManufacture;
