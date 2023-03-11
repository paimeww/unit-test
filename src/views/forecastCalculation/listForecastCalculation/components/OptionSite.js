import { helperFilterListFC } from "helpers/forecastCalculation";
import { debounce } from "helpers/utils";
import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionSite = ({ onChange, key, id, sessionData, userRoles }) => {
  const token = useSelector((state) => state.auth.token);
  const stateFilter = useSelector((state) => state.listFC.filter);
  const listFC = useSelector((state) => state.listFC.response);
  const value = {
    label: stateFilter?.site
      ? stateFilter?.site?.length > 0
        ? stateFilter?.site
        : "Select..."
      : "Select...",
    value: stateFilter?.site ?? "",
  };

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var isExist = listOptions.filter((element) => element.value == item.site);
      if (isExist.length == 0) {
        var itemOption = { value: item.site, label: item.site };
        listOptions = [...listOptions, itemOption];
      }
    });

    return listOptions;
  };

  const loadOptionsDebounced = useCallback(
    debounce(async (inputValue, callback) => {
      if (token && inputValue != "") {
        helperFilterListFC(inputValue, token, sessionData, userRoles).then(
          async (data) => {
            return callback(await loadOptions(data));
          }
        );
      } else {
        return callback(await loadOptions(listFC));
      }
    }, 2000),
    []
  );

  return (
    <Fragment>
      <AsyncSelect
        instanceId={"OptionSite"}
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

export default OptionSite;
