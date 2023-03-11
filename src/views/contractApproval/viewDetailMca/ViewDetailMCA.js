import React from "react";
import HeaderDetailMCA from "./sections/HeaderDetailMCA";
import TableDetailMCA from "./sections/TableDetailMCA";

const ViewDetailMCA = () => {
  return (
    <React.Fragment>
      <HeaderDetailMCA />
      <div className="" style={{ minHeight: 500 }}>
        <TableDetailMCA />
      </div>
    </React.Fragment>
  );
};

export default ViewDetailMCA;
