import React from "react";
import HeaderInquiryCA from "./sections/HeaderInquiryCA";
import FromGroupInquiryCA from "./sections/FormGroupInquiryCA";

const FormInquiryCA = ({ data, userRoles, sessionData }) => {
  return (
    <React.Fragment>
      <HeaderInquiryCA />
      <FromGroupInquiryCA
        data={data}
        userRoles={userRoles}
        sessionData={sessionData}
      />
    </React.Fragment>
  );
};

export default FormInquiryCA;
