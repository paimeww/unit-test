import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";

const HeaderBC = ({}) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Contract Biding"
        breadCrumbActive="Bid Comparison"
      />
      <h3 className="my-2">Bid Comparison</h3>
      <br />
    </React.Fragment>
  );
};

export default React.memo(HeaderBC);
