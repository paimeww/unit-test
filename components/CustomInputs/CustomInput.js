import { useField } from "formik";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const SelfCustomInput = ({ label, isBold, height, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <React.Fragment>
      <FormGroup className="mx-0 px-0 col-12">
        {label && !isBold && <Label for={props.name}>{label}</Label>}
        {label && isBold && (
          <span className="font-weight-bold" for={props.name}>
            {label}
          </span>
        )}
        {height && (
          <Input
            invalid={meta.touched && meta.error}
            {...field}
            {...props}
            id={props.name}
            style={{ height: height }}
          />
        )}
        {!height && (
          <Input
            invalid={meta.touched && meta.error}
            {...field}
            {...props}
            id={props.name}
          />
        )}
        {meta.touched && meta.error && (
          <FormFeedback>{meta.error}</FormFeedback>
        )}
      </FormGroup>
    </React.Fragment>
  );
};
export default SelfCustomInput;
