/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
/* eslint-disable import/order */
import SigninIcon from "../../../assets/icons/fill/Signin";
import MainTooltip from "../Tooltip/MainTooltip";
import LogoIcon from "../../../assets/icons/logo/Logo";
import { useEffect } from "react";
import ExpandRightIcon from "../../../assets/icons/fill/ExpandRight";
import { useTranslation } from "react-i18next";
import CloseIcon from "@/src/assets/icons/fill/Close";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebarStore } from "@/src/stores/useSidebar";
import sideBarItem from "@/src/constants/sideBarItem";
import { logout } from "@/src/services/AuthService";

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const {
    isSidebarOpen,
    toggleSidebar,
    isSidebarExpanded,
    expandSidebarToggle,
  } = useSidebarStore();

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isSidebarOpen) {
        toggleSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed md:hidden inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm z-40"
          onClick={() => toggleSidebar(false)}
        />
      )}
      <div
        className={`bg-black dark:bg-white/10 backdrop-blur-sm text-white px-5 py-4 h-[93.5dvh] transition-all duration-[250ms] rounded-[40px] ${
          isSidebarExpanded ? "w-64" : "w-[70px]"
        } fixed md:sticky md:top-5 z-50 ${
          isSidebarOpen &&
          `${i18n.language === "fa" ? "right-5" : "left-5"} !w-max sm:w-[40%]`
        } ${
          !isSidebarOpen &&
          `${i18n.language === "fa" ? "-right-96" : "-left-96"}`
        }`}
      >
        <div
          className={`flex flex-col ${
            isSidebarExpanded || isSidebarOpen ? "items-start" : "items-center"
          } justify-between h-full relative`}
        >
          <MainTooltip content={isSidebarExpanded ? "Collapse" : "Expand"}>
            <span
              className={`hidden md:inline-block absolute ${
                i18n.language === "fa" ? "-left-8" : "-right-8 "
              } top-[50px] cursor-pointer transition-all duration-250 ${
                isSidebarExpanded ? "rotate-180" : "rotate-0"
              }`}
              onClick={expandSidebarToggle}
            >
              <div className={`${i18n.language === "fa" && "rotate-180"}`}>
                <ExpandRightIcon />
              </div>
            </span>
          </MainTooltip>
          <div>
            <div className="flex items-center gap-4 sm:gap-3 flex-wrap-reverse mt-2">
              <LogoIcon />
              {/* //TODO should set title here also */}
              <h1 className="ltr:font-poppinsRegular text-2xl sm:text-3xl md:hidden text-white">
                {t(document.title)}
              </h1>
              <span
                className="cursor-pointer md:hidden"
                onClick={() => toggleSidebar(false)}
              >
                <CloseIcon />
              </span>
            </div>
            <ul className="flex flex-col gap-4 mt-16">
              {sideBarItem(pathname).map((item, index) => (
                <li
                  key={index}
                  className="child-hover:text-primaryGreen child:text-white child:transition-all"
                >
                  <Link className="flex items-center gap-2" href={item.href}>
                    <MainTooltip key={index} content={t(item.title)}>
                      <span className="cursor-pointer">{item.Icon}</span>
                    </MainTooltip>
                    <span
                      className={`ltr:font-poppinsRegular ${
                        !isSidebarExpanded && "md:hidden"
                      }`}
                    >
                      {t(item.title)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* //TODO should change this to link */}
          <div className={`flex items-center mt-4 gap-2`} onClick={logout}>
            <MainTooltip content="Signout">
              <span className="cursor-pointer">
                <SigninIcon />
              </span>
            </MainTooltip>

            <span
              className={`text-white cursor-pointer ltr:font-poppinsRegular transition-all hover:text-red-700 ${
                !isSidebarExpanded && "md:hidden"
              }`}
            >
              {t("signout")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}