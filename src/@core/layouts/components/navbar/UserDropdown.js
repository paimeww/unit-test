// ** Next Imports
import Link from "next/link";

// ** Custom Components
import Avatar from "src/@core/components/avatar";

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";
import { signOut, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const UserDropdown = ({ newUser }) => {
  const { data: session, status } = useSession();
  // const session = [{user;}];

  const router = useRouter();

  const logoutFunc = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    signOut();
  };

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        // href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        // onClick={(e) => e.preventDefault()}
        onClick={() => router.push("/signIn")}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {session?.user.name}
          </span>
          <span className="user-status">{session?.user.department}</span>
        </div>
        <Avatar
          img="/images/portrait/small/avatar-s-placeholder.png"
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu right>
        {/* <DropdownItem tag={Link} href="/apps/email">
          <a className="dropdown-item" onClick={() => router.push("/profile")}>
            <User size={14} className="mr-75" />
            <span className="align-middle">Profile</span>
          </a>
        </DropdownItem>
        <DropdownItem tag={Link} href="/apps/email">
          <a className="dropdown-item">
            <Mail size={14} className="mr-75" />
            <span className="align-middle">Inbox</span>
          </a>
        </DropdownItem>
        <DropdownItem tag={Link} href="/apps/todo">
          <a className="dropdown-item">
            <CheckSquare size={14} className="mr-75" />
            <span className="align-middle">Tasks</span>
          </a>
        </DropdownItem>
        <DropdownItem tag={Link} href="/apps/chat">
          <a className="dropdown-item">
            <MessageSquare size={14} className="mr-75" />
            <span className="align-middle">Chats</span>
          </a>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} href="/pages/account-settings">
          <a className="dropdown-item">
            <Settings size={14} className="mr-75" />
            <span className="align-middle">Settings</span>
          </a>
        </DropdownItem>
        <DropdownItem tag={Link} href="/pages/pricing">
          <a className="dropdown-item">
            <CreditCard size={14} className="mr-75" />
            <span className="align-middle">Pricing</span>
          </a>
        </DropdownItem>
        <DropdownItem tag={Link} href="/pages/faq">
          <a className="dropdown-item">
            <HelpCircle size={14} className="mr-75" />
            <span className="align-middle">FAQ</span>
          </a>
        </DropdownItem> */}
        {!newUser && (
          <DropdownItem className="dropdown-item w-100" onClick={logoutFunc}>
            <Power size={14} className="mr-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        )}
        {newUser && (
          <DropdownItem className="dropdown-item w-100" onClick={signIn}>
            <Power size={14} className="mr-75" />
            <span className="align-middle">Login</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
