import { helperFilterListCA } from "helpers/contractApproval";
import { debounce } from "helpers/utils";
import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionStatusContract = ({ onChange, key, id }) => {
  const token = useSelector((state) => state.auth.token);
  const stateFilter = useSelector((state) => state.contractApproval.filter);
  const listCA = useSelector(
    (state) => state.contractApproval.response?.data ?? []
  );
  const value = {
    label: stateFilter?.StatusContract
      ? stateFilter?.StatusContract?.length > 0
        ? stateFilter?.StatusContract
        : "Select..."
      : "Select...",
    value: stateFilter?.StatusContract ?? "",
  };

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var itemOption = {
        value: item.statusContract ?? "",
        label: item.statusContract ?? "",
      };
      const isExist = listOptions.filter(
        (element) => element.label == itemOption.label
      );
      if (isExist.length == 0 && itemOption.value.length > 0) {
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
        instanceId={"OptionStatusContract"}
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

export default OptionStatusContract;
