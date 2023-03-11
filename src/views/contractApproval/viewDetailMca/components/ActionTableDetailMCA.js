import React from "react";
import {
  MoreVertical,
  Edit2,
  CheckCircle,
  XCircle,
  EyeOff,
  CornerUpLeft,
} from "react-feather";
import Link from "next/link";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ActionTableDetailMCA = () => {
  return (
    <React.Fragment>
      <UncontrolledDropdown>
        <DropdownToggle
          className="icon-btn hide-arrow"
          color="transparent"
          size="sm"
          caret
        >
          <MoreVertical size={15} />
        </DropdownToggle>
        <DropdownMenu
          style={{ top: "inherit", left: "inherit" }}
          className="border-0 border-radius-6 position-fixed"
        >
          <Link href="/">
            <DropdownItem
              href="/"
              className="action-vuexy-item"
              // onClick={() => {
              //   router.replace(`idea_catalog/detail/${id}`);
              // }}
            >
              <Edit2 className="mr-2" size={15} />{" "}
              <span className="align-middle">View Details</span>
            </DropdownItem>
          </Link>
          <DropdownItem className="action-vuexy-item w-100">
            <CheckCircle className="mr-2" size={15} />{" "}
            <span className="align-middle font-weight-bold">Submit</span>
          </DropdownItem>
          <DropdownItem className="action-vuexy-item w-100">
            <XCircle className="mr-2" size={15} />{" "}
            <span className="align-middle font-weight-bold">Reject</span>
          </DropdownItem>
          <DropdownItem className="action-vuexy-item w-100">
            <EyeOff className="mr-2" size={15} />{" "}
            <span className="align-middle">Hide</span>
          </DropdownItem>
          <DropdownItem className="action-vuexy-item w-100">
            <XCircle className="mr-2" size={15} />{" "}
            <span className="align-middle font-weight-bold">Revised</span>
          </DropdownItem>
          <DropdownItem className="action-vuexy-item w-100">
            <CornerUpLeft className="mr-2" size={15} />{" "}
            <span className="align-middle font-weight-bold">Revised</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
};

export default React.memo(ActionTableDetailMCA);
