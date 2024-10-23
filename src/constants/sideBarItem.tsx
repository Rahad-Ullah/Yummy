/* eslint-disable import/order */
import { Home, User, Utensils } from "lucide-react";

export function UserSideBarItem() {
  return [
    {
      title: "Dashboard",
      Icon: <Home size={28} />,
      href: "/dashboard",
    },
    {
      title: "Profile",
      Icon: <User size={28} />,
      href: "/profile",
    },
    {
      title: "My Recipes",
      Icon: <Utensils size={28} />,
      href: "/my-recipes",
    },
  ];
}

export function AdminSideBarItem() {
  return [
    {
      title: "Dashboard",
      Icon: <Home size={28} />,
      href: "/dashboard",
    },
    {
      title: "Profile",
      Icon: <User size={28} />,
      href: "/profile",
    },
    {
      title: "Recipes",
      Icon: <Utensils size={28} />,
      href: "/recipes",
    },
  ];
}
