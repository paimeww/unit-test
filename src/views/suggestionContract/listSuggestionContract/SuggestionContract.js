import React, { useState } from "react";
import TableSuggestionContract from "./sections/TableSuggestionContract";
import HeaderSuggestionContract from "./sections/HeaderSuggectionContract";
import BasicSkeleton from "components/Skeleton/BasicSkeleton";
import { useSelector } from "react-redux";

const SuggestionContract = ({ sessionData, userRoles }) => {
  const stateRedux = useSelector((state) => state.listSC);
  const [dataChecklist, setDataChecklist] = useState([]);

  return (
    <React.Fragment>
      <HeaderSuggestionContract
        listSC={stateRedux.response}
        dataChecklist={dataChecklist}
        sessionData={sessionData}
        userRoles={userRoles}
        callbackGenerateReqNumber={() => {
          setDataChecklist([]);
        }}
      />
      {!stateRedux.loading && stateRedux.response && (
        <div className="" style={{ minHeight: 500 }}>
          <TableSuggestionContract
            listSC={stateRedux.response}
            sessionData={sessionData}
            userRoles={userRoles}
            dataChecklist={dataChecklist}
            onChange={(value, item) => {
              if (value?.target?.checked) {
                setDataChecklist([...dataChecklist, item]);
              } else {
                const removeData = dataChecklist.filter(
                  (el) => el.id != item.id
                );
                setDataChecklist(removeData);
              }
            }}
          />
        </div>
      )}
      {stateRedux.loading && <BasicSkeleton />}
    </React.Fragment>
  );
};

export default React.memo(SuggestionContract);
