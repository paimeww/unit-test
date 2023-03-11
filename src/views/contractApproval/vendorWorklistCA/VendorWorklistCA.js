import BasicSkeleton from "components/Skeleton/BasicSkeleton";
import React from "react";
import { useSelector } from "react-redux";
import HeaderWorklistCA from "./sections/HeaderWorklistCA";
import TableWorklistCA from "./sections/TableWorklistCA";

const VendorWorklistCA = ({ sessionData, userRoles }) => {
  const stateRedux = useSelector((state) => state.contractApproval);

  return (
    <React.Fragment>
      <HeaderWorklistCA
        sessionData={sessionData}
        contractApproval={stateRedux.response}
        userRoles={userRoles}
      />
      {stateRedux.response != null && !stateRedux.loading && (
        <TableWorklistCA
          sessionData={sessionData}
          contractApproval={stateRedux.response}
          userRoles={userRoles}
        />
      )}
      {stateRedux.loading && <BasicSkeleton />}
    </React.Fragment>
  );
};

export default VendorWorklistCA;
