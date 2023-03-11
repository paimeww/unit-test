import { useField } from "formik";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const MyCustomSelect = ({ label, options = [], ...props }) => {
  const [field, meta] = useField(props);

  return (
    <React.Fragment key={Math.floor(Math.random() * 100000).toString()}>
      <FormGroup className="mx-0 px-0 col-12">
        {label && (
          <span className="font-weight-bold" for={props.name}>
            {label}
          </span>
        )}
        <Input
          invalid={meta.touched && meta.error}
          type="select"
          {...field}
          {...props}
          id={props.name}
        >
          {options.map((item) => {
            return (
              <option
                value={item.value}
                key={Math.floor(Math.random() * 100000).toString()}
              >
                {item.label}
              </option>
            );
          })}
        </Input>
        {meta.touched && meta.error && (
          <FormFeedback>{meta.error}</FormFeedback>
        )}
      </FormGroup>
    </React.Fragment>
  );
};
export default MyCustomSelect;
