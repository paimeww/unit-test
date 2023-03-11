import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import UtilityWorklistCPRO from "./UtilityWorklistCPRO";

const HeaderWorklistCPRO = ({ sessionData, userRoles }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Contract Approval"
        breadCrumbActive="My Task Approval Contract (CPRO)"
        showTitle={false}
      />
      <UtilityWorklistCPRO sessionData={sessionData} userRoles={userRoles} />
    </React.Fragment>
  );
};

export default React.memo(HeaderWorklistCPRO);
