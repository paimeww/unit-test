import { getListUom, helperOptionListRB } from "helpers/requestBid";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

const OptionListUom = ({ onChange, key, id, listBidConsole, defaultValue }) => {
  const [optionsData, setOptionsData] = useState([]);
  const [value, setValue] = useState(
    defaultValue.value.length > 0
      ? defaultValue
      : {
          label: "Select...",
          value: "",
        }
  );

  useEffect(() => {
    setValue(
      defaultValue.value.length > 0
        ? defaultValue
        : {
            label: "Select...",
            value: "Select...",
          }
    );
    return () => {};
  }, [defaultValue]);

  useEffect(() => {
    getListUom((response) => {
      var listItemValue = [];
      response.map((item) => {
        var isUomExist = listBidConsole.filter((element) => {
          return element.uom == item.uomCode;
        });

        if (isUomExist.length > 0) {
          var itemValue = {
            label: item.uomCode + " - " + item.uomDescription,
            value: item.uomCode,
            uom: item.uomCode,
          };
          listItemValue = [...listItemValue, itemValue];
        }
      });
      setOptionsData(listItemValue);
    });
    return () => {};
  }, [listBidConsole]);

  return (
    <Fragment>
      <Select
        instanceId={"OptionListUom"}
        options={optionsData}
        onChange={(value) => {
          setValue({
            label: value?.value ?? "",
            value: value?.value ?? "",
            uom: value?.value ?? "",
          });
          onChange(value);
        }}
        value={{
          label: value?.value ?? "",
          value: value?.value ?? "",
        }}
      />
    </Fragment>
  );
};

export default OptionListUom;
