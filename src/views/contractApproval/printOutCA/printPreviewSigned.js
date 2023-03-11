import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  "http://file-staging-kf-asd-general-staging.apps.alpha.kalbe.co.id/api/Files/247DC5D5-9CD4-42FF-981A-72CD9B25D93D/download";

export default function PrintPreviewSigned() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  } 

  return (
    <div>
      <div>
        <Document
          file={
            "http://file-staging-kf-asd-general-staging.apps.alpha.kalbe.co.id/api/Files/247DC5D5-9CD4-42FF-981A-72CD9B25D93D/download"
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
