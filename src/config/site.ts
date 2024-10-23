export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Yummy",
  description: "Yummy Recipes",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
