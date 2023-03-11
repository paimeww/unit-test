// export default OptionMaterials;
import { getOptionMaterials } from "helpers/bidComparison";
import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";

const OptionMaterials = ({ onChange, key, id, token }) => {
  const [optionsData, setOptionsData] = useState([]);
  const [value, setValue] = useState({
    label: "Select...",
    value: "",
  });

  useEffect(() => {
    getOptionMaterials(token).then((response) => {
      var listItemValue = [];
      response.map((item) => {
        if (item.length > 0) {
          var isExist = listItemValue.filter((el) => el.value == item);
          if (isExist.length == 0) {
            var itemValue = {
              label: item,
              value: item,
            };
            listItemValue = [...listItemValue, itemValue];
          }
        }
      });
      setOptionsData(listItemValue);
    });
    return () => {};
  }, []);

  return (
    <Fragment>
      <div style={{ zIndex: 999999, display: "block" }}>
        <Select
          instanceId={id}
          options={optionsData}
          isClearable
          onChange={(value) => {
            setValue(value);
            onChange(value);
          }}
          value={value}
        />
      </div>
    </Fragment>
  );
};

export default OptionMaterials;
