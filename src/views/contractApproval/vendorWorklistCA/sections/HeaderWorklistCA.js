import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UtilityWorklistCA from "./UtilityWorklistCA";

const MySwal = withReactContent(Swal);

const HeaderWorklistCA = ({ sessionData, userRoles }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Contract Approval"
        breadCrumbActive="Form My Task Approval Contract (Vendor)"
        showTitle={false}
      />
      <UtilityWorklistCA sessionData={sessionData} userRoles={userRoles} />
    </React.Fragment>
  );
};

export default React.memo(HeaderWorklistCA);
