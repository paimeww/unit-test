import React from "react";
import HeaderCPRO from "./sections/HeaderCPRO";
import FromGroupCPRO from "./sections/FormGroupCPRO";

const CreatorFormCPRO = ({ sessionData, userRoles, data }) => {
  return (
    <React.Fragment>
      <HeaderCPRO />
      <FromGroupCPRO
        sessionData={sessionData}
        userRoles={userRoles}
        data={data}
      />
    </React.Fragment>
  );
};

export default CreatorFormCPRO;
