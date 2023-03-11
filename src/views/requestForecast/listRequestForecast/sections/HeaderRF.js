import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UtilityRF from "./UtilityRF";

const MySwal = withReactContent(Swal);

const HeaderRF = () => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Request Forecast"
        breadCrumbActive="My Task Approval"
      />
      <UtilityRF />
    </React.Fragment>
  );
};

export default React.memo(HeaderRF);
