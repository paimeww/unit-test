// ** React Imports
// import { Link } from 'react-router-dom'

// ** Third Party Components
import { useRouter } from "next/router";
import { Card, CardBody, Button } from "reactstrap";

const PreviewActionsCA = ({ id }) => {
  const router = useRouter();
  return (
    <Card className="invoice-action-wrapper">
      <CardBody>
        <Button.Ripple
          color="secondary"
          to="/apps/invoice/print"
          target="_blank"
          block
          outline
          className="mb-75"
          onClick={() =>
            router.push("/contract_approval/pdf_download/" + router.query.id)
          }
        >
          Print
        </Button.Ripple>
      </CardBody>
    </Card>
  );
};

export default PreviewActionsCA;
