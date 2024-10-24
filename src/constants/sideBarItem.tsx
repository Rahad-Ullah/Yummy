/* eslint-disable import/order */
import { Home, User, Users, Users2, Utensils } from "lucide-react";

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
      href: "/dashboard/profile",
    },
    {
      title: "My Recipes",
      Icon: <Utensils size={28} />,
      href: "/dashboard/my-recipes",
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
      href: "/dashboard/profile",
    },
    {
      title: "Recipes",
      Icon: <Utensils size={28} />,
      href: "/dashboard/recipes",
    },
    {
      title: "Users",
      Icon: <Users2 size={28} />,
      href: "/dashboard/users",
    },
    {
      title: "Admins",
      Icon: <Users size={28} />,
      href: "/dashboard/admins",
    },
  ];
}
