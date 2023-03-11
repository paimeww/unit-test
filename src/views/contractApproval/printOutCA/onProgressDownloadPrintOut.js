import React from "react";

function OnProgressDownloadPrintOut() {
  return (
    <iframe
      id="iframepdf"
      src="http://file-staging-kf-asd-general-staging.apps.alpha.kalbe.co.id/api/Files/247DC5D5-9CD4-42FF-981A-72CD9B25D93D/download"
    >
      <Button color="primary" disabled>
        Loading
        <Spinner
          style={{ width: "0.5rem", height: "0.5rem" }}
          type="grow"
          color="light"
        />
        <Spinner
          style={{ width: "0.5rem", height: "0.5rem" }}
          type="grow"
          color="light"
        />
        <Spinner
          style={{ width: "0.5rem", height: "0.5rem" }}
          type="grow"
          color="light"
        />
      </Button>
    </iframe>
  );
}

export default OnProgressDownloadPrintOut;
