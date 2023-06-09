import {
  FileText,
} from "react-feather";
import {
  Card,
  Form,
} from "reactstrap";
import Link from "next/link";

const CustomStepperForm = ({ children, header, subheader, onSubmitForm }) => {
  return (
    <div className="d-flex">
      <div className="mr-1">
        <div
          className="d-flex justify-content-center align-items-center bg-primary rounded"
          style={{ width: "3rem", height: "3rem" }}
        >
          <FileText size={24} color="white" />
        </div>
      </div>
      <div className="w-100">
        <div style={{ height: "3rem" }}>
          <h5 className="m-0">{header}</h5>
          <p className="text-muted m-0">{subheader}</p>
        </div>
        <div className="my-1"></div>
        <Card className="p-4">
          <Form onSubmit={onSubmitForm}>{children}</Form>
        </Card>
      </div>
    </div>
  );
};

export default CustomStepperForm;
