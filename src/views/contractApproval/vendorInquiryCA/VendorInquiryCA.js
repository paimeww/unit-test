import BasicSkeleton from "components/Skeleton/BasicSkeleton";
import React from "react";
import { useSelector } from "react-redux";
import HeaderInquiryCA from "./sections/HeaderInquiryCA";
import TableInquiryCA from "./sections/TableInquiryCA";

const VendorInquiryCA = ({ sessionData, userRoles }) => {
  const stateRedux = useSelector((state) => state.contractApproval);

  return (
    <React.Fragment>
      <HeaderInquiryCA
        sessionData={sessionData}
        contractApproval={stateRedux.response}
        userRoles={userRoles}
      />
      {stateRedux.response != null && !stateRedux.loading && (
        <div className="" style={{ minHeight: 500 }}>
          <TableInquiryCA
            sessionData={sessionData}
            contractApproval={stateRedux.response}
            userRoles={userRoles}
          />
        </div>
      )}
      {stateRedux.loading && <BasicSkeleton />}
    </React.Fragment>
  );
};

export default VendorInquiryCA;
