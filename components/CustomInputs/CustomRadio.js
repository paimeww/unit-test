import { Field, useField } from "formik";
import React from "react";
import { CustomInput, FormFeedback, FormGroup, Input, Label } from "reactstrap";

const MyCustomRadio = ({
  label,
  name,
  options = [],
  isRow = false,
  ...props
}) => {
  return (
    <div className="mb-1 col-12 m-0 p-0 row">
      <label className="" htmlFor={name}>
        {label}
      </label>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <React.Fragment>
              {options.map((option) => {
                return (
                  <React.Fragment key={option.key}>
                    <div
                      className={
                        isRow
                          ? `col-4 d-flex flex align-items-center mb-0 mb-1 mt-2`
                          : `col-12 d-flex flex align-items-center mb-0 mb-1`
                      }
                    >
                      <input
                        type="radio"
                        id={option.key}
                        {...field}
                        style={{ height: 20, width: 20 }}
                        value={option.value}
                        checked={field.value === option.value}
                      />
                      <span style={{ marginLeft: 5 }} htmlFor={option.key}>
                        {option.value}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
              {meta.touched && meta.error != undefined && (
                <FormGroup className="m-0 p-0 col-12">
                  <Input invalid={meta.touched && meta.error} hidden />
                  <div style={{ paddingTop: 10 }}></div>
                  <FormFeedback>{meta.error}</FormFeedback>
                </FormGroup>
              )}
            </React.Fragment>
          );
        }}
      </Field>
    </div>
  );
};
export default MyCustomRadio;
