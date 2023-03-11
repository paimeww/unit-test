import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UtilityConAp from "./UtilityConAp";

const MySwal = withReactContent(Swal);

const HeaderConAp = ({ sessionData, userRoles }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Contract Approval"
        breadCrumbActive="Monitoring Contract Approval"
        showTitle={false}
      />
      <UtilityConAp
        sessionData={sessionData}
        userRoles={userRoles}
      />
    </React.Fragment>
  );
};

export default React.memo(HeaderConAp);
