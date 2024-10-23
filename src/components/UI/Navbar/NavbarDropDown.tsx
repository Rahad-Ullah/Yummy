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
  const { setIsLoading: setUserLoading } = useUser();

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
        <Avatar />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/dashboard")}>
          Dashboard
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/dashboard/profile")}>
          Profile
        </DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem
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
