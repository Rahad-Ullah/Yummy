"use client";
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
import { Avatar, Card, Divider, Input, Kbd } from "@nextui-org/react";
import SearchIcon from "../../../assets/icons/fill/Search";
import SettingsIcon from "../../../assets/icons/fill/Settings";
import MainTooltip from "../Tooltip/MainTooltip";
import NotificationPin from "../../../assets/icons/fill/NotificationPin";
import PopOver from "../Popover/Popover";
import UserPopoverContent from "../Popover/PopoverContents/UserPopoverContent";
import MenuIcon from "../../../assets/icons/fill/Menu";
import { useTranslation } from "react-i18next";
import { useSidebarStore } from "@/src/stores/useSidebar";
import { ThemeSwitch } from "../../theme-switch";
import { useUser } from "@/src/context/user.provider";

export default function Topbar() {
  const { t } = useTranslation();
  const { isSidebarOpen, toggleSidebar, isSidebarExpanded } = useSidebarStore();
  const { user } = useUser();

  return (
    <Card className="dark:bg-black dark:shadow-md dark:shadow-white rounded-full py-3 px-5 flex-row justify-between items-center sticky top-5 z-20">
      <div className="flex items-center gap-2">
        <span
          onClick={() => toggleSidebar(true)}
          className="cursor-pointer md:hidden"
        >
          <MenuIcon />
        </span>
        {/* //TODO should fix this when we Login the title is Login */}
        {!isSidebarOpen && (
          <h1 className="ltr:font-poppinsRegular text-lg md:text-2xl">
            {t("Dashboard")}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-.5 2xs:gap-1 sm:gap-5">
        <Input
          classNames={{
            inputWrapper: ["rounded-full"],
          }}
          className={`font-poppinsRegular hidden ${
            isSidebarExpanded ? "lg:block lgb:block" : "lg:block"
          }`}
          startContent={<SearchIcon />}
          endContent={
            <Kbd className="" keys={["command"]}>
              K
            </Kbd>
          }
          placeholder={t("search")}
        />
        <MainTooltip content={t("settings")}>
          <span className="cursor-pointer hidden sm:block">
            <SettingsIcon />
          </span>
        </MainTooltip>
        <MainTooltip content={t("notification")}>
          <span className="cursor-pointer hidden sm:block">
            <NotificationPin />
          </span>
        </MainTooltip>
        <div className="hidden sm:block">
          <ThemeSwitch />
        </div>
        {/* <MainDropdown content={<ChangeLanguage />}>
          <Avatar
            src={languages.find((lng) => lng.key === i18n.language)?.icon}
            className="w-[30px] h-[30px] cursor-pointer lg:w-[90px] lg:h-[35px]"
          />
        </MainDropdown> */}
        <Divider className="rotate-90 w-5 h-[2px] bg-primaryGray" />
        <PopOver content={<UserPopoverContent user={user} />}>
          <div>
            <Avatar
              src={user?.profilePhoto as string}
              className={`block ${
                isSidebarExpanded ? "md:block" : "md:block"
              } mdb:hidden cursor-pointer`}
            />
          </div>
        </PopOver>
      </div>
    </Card>
  );
}
