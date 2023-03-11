import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UtilityRB from "./UtilityRB";

const MySwal = withReactContent(Swal);

const HeaderRB = () => {

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Request Bid"
        breadCrumbActive="Request Bid History"
      />
      <UtilityRB />
    </React.Fragment>
  );
};

export default React.memo(HeaderRB);
