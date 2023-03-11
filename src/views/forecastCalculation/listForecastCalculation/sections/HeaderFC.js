import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const HeaderFC = ({ sessionData }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Forecast Calculation"
        breadCrumbActive="Forecast Calculation List"
      />
    </React.Fragment>
  );
};

export default React.memo(HeaderFC);
