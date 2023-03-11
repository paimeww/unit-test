import { getOptionManufacture, helperOptionListRB } from "helpers/requestBid";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const OptionListManufacture = ({ onChange, key, id }) => {
  const token = useSelector((state) => state.auth.token);
  const [value, setValue] = useState({
    label: "Select...",
    value: "",
  });

  const loadOptions = async (inputValue) => {
    if (token) {
      const data = await getOptionManufacture(inputValue, token);
      var listOptions = [];

      (data ?? []).map((item) => {
        var isExist = listOptions.filter((el) => el.value == item.manufacturer);
        if (isExist.length == 0) {
          var itemOption = {
            value: item.manufacturer ?? "",
            label: item.manufacturer ?? "",
            id: item.id ?? "",
          };
          listOptions = [...listOptions, itemOption];
        }
      });

      return listOptions;
    } else {
      return [];
    }
  };

  return (
    <Fragment>
      <AsyncSelect
        instanceId={"OptionListManufacture"}
        loadOptions={loadOptions}
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

export default OptionListManufacture;
