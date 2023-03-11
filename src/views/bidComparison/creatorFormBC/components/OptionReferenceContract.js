import { getOptionsRefContract } from "helpers/bidComparison";
import { debounce } from "helpers/utils";
import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionReferenceContract = ({
  onChange,
  key,
  id,
  vendorId,
  genericName,
}) => {
  const token = useSelector((state) => state.auth.token);
  const [value, setValue] = useState({
    label: "Select...",
    value: "",
  });

  const loadOptions = async (data) => {
    var listOptions = [];

    (data ?? []).map((item) => {
      var isExist = listOptions.filter(
        (element) => element.value == item.contractNumber
      );
      if (
        isExist.length == 0 &&
        item.contractNumber != null &&
        item.contractNumber.length > 0
      ) {
        var itemOption = {
          value: item.contractNumber ?? "",
          label: item.contractNumber ?? "",
        };
        listOptions = [...listOptions, itemOption];
      }
    });

    return listOptions;
  };

  const loadOptionsDebounced = useCallback(
    debounce(async (inputValue, callback) => {
      if (token) {
        getOptionsRefContract(inputValue, token, vendorId, genericName).then(
          async (data) => {
            return callback(await loadOptions(data));
          }
        );
      } else {
        return callback(await loadOptions([]));
      }
    }, 2000),
    []
  );

  return (
    <Fragment>
      <AsyncSelect
        instanceId={"OptionReferenceContract"}
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

export default OptionReferenceContract;
