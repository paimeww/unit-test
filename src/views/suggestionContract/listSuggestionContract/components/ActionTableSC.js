import React from "react";
import { MoreVertical, Edit2 } from "react-feather";
import Link from "next/link";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ActionTableSC = () => {
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
              <span className="align-middle">Edit</span>
            </DropdownItem>
          </Link>
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
};

export default React.memo(ActionTableSC);
