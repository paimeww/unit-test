import React from "react";
import PropTypes from "prop-types";

function InputLoopComponent(props) {
  const { data, label } = props;

  return (
    <div
      style={{
        width: data.length <= 3 ? "100%" : data.length * 320 + 300,
      }}
      className="d-flex flex-md-row flex-column jus justify-content-md-start align-items-md-center mt-1"
    >
      <div
        style={{ width: 220 }}
        className="flex d-flex justify-content-start align-items-start p-0 m-0"
      >
        <span className="font-weight-bold">{label}</span>  
      </div>
      <div
        style={{
          width: data.length <= 3 ? "100%" : data.length * 320,
          minWidth: 320,
        }}
        className="flex d-flex mx-0 px-0"
      >
        {props.children}
      </div>
    </div>
  );
}

InputLoopComponent.propTypes = {};

export default InputLoopComponent;
