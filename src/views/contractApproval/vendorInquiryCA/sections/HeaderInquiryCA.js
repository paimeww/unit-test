import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import UtilityInquiryCA from "./UtilityInquiryCA";

const HeaderInquiryCA = ({ sessionData, userRoles }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Contract Approval"
        breadCrumbActive="Form Inquiry Approval Contract (Vendor)"
        showTitle={false}
      />
      <UtilityInquiryCA sessionData={sessionData} userRoles={userRoles} />
    </React.Fragment>
  );
};

export default React.memo(HeaderInquiryCA);
