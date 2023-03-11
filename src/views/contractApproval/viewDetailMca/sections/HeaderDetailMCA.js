import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UtilityDetailMCA from "./UtilityDetailMCA";

const MySwal = withReactContent(Swal);

const HeaderDetailMCA = () => {

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Contract Approval"
        breadCrumbParent2="Monitoring Contract Approval"
        breadCrumbActive="View Detail Monitoring Contract Approval"
        showTitle={false}
      />
      <UtilityDetailMCA />
    </React.Fragment>
  );
};

export default React.memo(HeaderDetailMCA);
