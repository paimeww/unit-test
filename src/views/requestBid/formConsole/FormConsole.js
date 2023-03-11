import React, { useEffect, useState } from "react";
import HeaderFormCsl from "./sections/HeaderFormCsl";
import TableBidHistory from "./sections/TableBidHistory";
import TableBidConsole from "./sections/TableBidConsole";
import UtilityBidConsole from "./sections/UtilityBidConsole";
import TableBidForContract from "./sections/TableBidForContract";
import UtilityBidForContract from "./sections/UtilityBidForContract";
import BasicSkeleton from "components/Skeleton/BasicSkeleton";
import { useSelector } from "react-redux";
import { calculateConversation } from "helpers/requestBid";

const RequestBidFormCsl = ({ token, userRoles }) => {
  const stateRedux = useSelector((state) => state.listRequestBid);
  const [uom, setUom] = useState({
    label: stateRedux.response?.uom ?? "",
    value: stateRedux.response?.uom ?? "",
    uom: stateRedux.response?.uom ?? "",
  });

  useEffect(() => {
    setUom({
      label: stateRedux.response?.uom ?? "",
      value: stateRedux.response?.uom ?? "",
      uom: stateRedux.response?.uom ?? "",
    });
    return () => {};
  }, [stateRedux.response]);

  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    setTotalQty(stateRedux.response?.totalQuantity ?? 0);
    return () => {};
  }, [stateRedux.response]);

  return (
    <React.Fragment>
      <HeaderFormCsl token={token} />
      {!stateRedux.loading && (
        <TableBidHistory token={token} formRequestBid={stateRedux.response} />
      )}
      {stateRedux.loading && <BasicSkeleton />}
      <UtilityBidConsole />
      {!stateRedux.loading && (
        <TableBidConsole
          formRequestBid={stateRedux.response}
          uom={uom}
          onChange={async (value) => {
            if ((value?.value ?? "").length > 0) {
              setUom(value);
              var valueConvertion = await calculateConversation(
                stateRedux.response.id,
                value?.value ?? "",
                token
              );
              setTotalQty(valueConvertion);
            }
          }}
          totalQty={totalQty}
        />
      )}
      {stateRedux.loading && <BasicSkeleton />}
      <UtilityBidForContract
        formRequestBid={stateRedux.response}
        userRoles={userRoles}
        uom={uom}
      />
      {!stateRedux.loading && (
        <TableBidForContract
          token={token}
          formRequestBid={stateRedux.response}
          userRoles={userRoles}
          uom={uom}
          totalQty={totalQty}
        />
      )}
      {stateRedux.loading && <BasicSkeleton />}
    </React.Fragment>
  );
};

export default React.memo(RequestBidFormCsl);
