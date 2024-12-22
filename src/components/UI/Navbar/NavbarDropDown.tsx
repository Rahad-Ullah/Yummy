"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";

const NavbarDropDown = () => {
  const router = useRouter();
  const { user, setIsLoading: setUserLoading } = useUser();

  const handleNavigation = (pathName: string) => {
    router.push(pathName);
  };

  const handleLogout = () => {
    logout();
    setUserLoading(true);
  };

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <Avatar src={user?.profilePhoto as string} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key={"Dashboard"}
          onClick={() => handleNavigation("/dashboard")}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key={"Profile"}
          onClick={() => handleNavigation("/dashboard/profile")}
        >
          Profile
        </DropdownItem>
        <DropdownItem key={"Settings"}>Settings</DropdownItem>
        <DropdownItem
          key={"Logout"}
          className="text-danger-500"
          color="danger"
          onClick={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
