/* eslint-disable import/order */
import MessageIcon from "../assets/icons/fill/Message";
import ChartIcon from "../assets/icons/fill/Chart";
import CreditIcon from "../assets/icons/fill/Credit";
import { Home, User, Utensils } from "lucide-react";

export default function sideBarItem(pathname: string) {
  return [
    {
      title: "Dashboard",
      Icon: (
        <Home
          className={`${pathname === "/profile" && "text-amber-500"}`}
          size={28}
        />
      ),
      href: "/dashboard",
    },
    {
      title: "Profile",
      Icon: (
        <User
          className={`${pathname === "/profile" && "text-amber-500"}`}
          size={28}
        />
      ),
      href: "/profile",
    },
    {
      title: "Recipes",
      Icon: (
        <Utensils
          className={`${pathname === "/recipes" && "text-amber-500"}`}
          size={28}
        />
      ),
      href: "/recipes",
    },
    {
      title: "Messages",
      Icon: <MessageIcon isActive={pathname === "/messages"} />,
      href: "/messages",
    },
    {
      title: "Statistics",
      Icon: <ChartIcon isActive={pathname === "/statistics"} />,
      href: "/statistics",
    },
    {
      title: "Payments",
      Icon: <CreditIcon isActive={pathname === "/payments"} />,
      href: "/payments",
    },
  ];
}
