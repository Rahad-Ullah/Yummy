/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
import { Divider } from "@nextui-org/react";
import MainUserCard from "../../UserCard/MainUserCard";
import SignoutIcon from "../../../../assets/icons/fill/Signout";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { logout } from "@/src/services/AuthService";
import Link from "next/link";
import { IUser } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { ThemeSwitch } from "@/src/components/theme-switch";

export default function UserPopoverContent({ user }: { user: IUser | null }) {
  const { setIsLoading: setUserLoading } = useUser();
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isLightMode = theme === "light";

  const changeThemeHandler = () => {
    switch (isLightMode) {
      case true:
        return setTheme("dark");
      case false:
        return setTheme("light");
    }
  };

  const handleLogout = () => {
    logout();
    setUserLoading(true);
  };
  return (
    <div className="w-56">
      <MainUserCard user={user} />
      <Divider className="my-2" />
      <ul className="w-full child:transition-all child:duration-200 child-hover:bg-primaryGray dark:child-hover:bg-black child:p-2 child:rounded-lg child:cursor-pointer space-y-2">
        <li>
          <Link href="/dashboard/profile">{t("Profile")}</Link>
        </li>
        <li>
          <Link href="">{t("Change Password")}</Link>
        </li>
        <li className="sm:hidden" onClick={changeThemeHandler}>
          <ThemeSwitch />
        </li>
      </ul>
      <Divider className="my-2" />
      <div
        className="flex items-center justify-between gap-2 hover:text-white hover:bg-red-700 translate-x-0 duration-200 w-full p-2 cursor-pointer rounded-lg"
        onClick={handleLogout}
      >
        <span>{t("Signout")}</span>
        <SignoutIcon />
      </div>
    </div>
  );
}
