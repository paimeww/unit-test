import { getPermissionComponent } from "helpers/getPermission";
import Link from "next/link";
import { useRouter } from "next/router";
import { Circle } from "react-feather";

const VerticalNavMenuLink = (props) => {
  // ** Props
  const {
    item,
    childItem,
    groupActive,
    setGroupActive,
    activeItem,
    setActiveItem,
    groupOpen,
    setGroupOpen,
    parentItem,
    menuCollapsed,
    menuVisibility,
  } = props;

  const router = useRouter();

  return (
    // getPermissionComponent(item.roles || []) && (
    <li
      className={`nav-item ${childItem ? "" : "my-50"} ${
        router.pathname === item.href ? "active" : ""
      }`}
    >
      <Link href={item.href || ""}>
        <a className="d-flex align-items-center">
          {item.icon}
          <span className="menu-item text-truncate">{item.title}</span>
        </a>
      </Link>
    </li>
    // )
  );
};

export default VerticalNavMenuLink;
