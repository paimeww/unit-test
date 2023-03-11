import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UtilityBidHistory from "./UtilityBidHistory";

const MySwal = withReactContent(Swal);

const HeaderFormCsl = ({token}) => {

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Request Bid"
        breadCrumbActive="Request Bid List" 
      />
      <UtilityBidHistory token={token} />
      <h3 className="mt-4">History</h3>
    </React.Fragment>
  );
};

export default React.memo(HeaderFormCsl);
