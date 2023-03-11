import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UtilitySuggestionContract from "./UtilitySuggestionContract";

const MySwal = withReactContent(Swal);

const HeaderSuggestionContract = ({
  dataChecklist,
  sessionData,
  userRoles,
  callbackGenerateReqNumber,
  listSC,
}) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Suggestion Contract"
        breadCrumbActive="Table Suggestion List"
      />
      <UtilitySuggestionContract
        dataChecklist={dataChecklist}
        sessionData={sessionData}
        userRoles={userRoles}
        callbackGenerateReqNumber={callbackGenerateReqNumber}
        listSC={listSC}
      />
    </React.Fragment>
  );
};

export default React.memo(HeaderSuggestionContract);
