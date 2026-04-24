import type { NavSection } from "@/types/navigation";
import { SidebarSVG } from "@/components/ui/svgs";

export const sidebarNavigation: NavSection[] = [
  {
    items: [
      {
        label: "Home",
        IconComponent: SidebarSVG.Home,
        href: "/",
      },
    ],
  },
  {
    title: "Games",
    items: [
      {
        label: "Action",
        IconComponent: SidebarSVG.Action,
        href: "/category/action",
      },
      {
        label: "Party",
        IconComponent: SidebarSVG.Party,
        href: "/category/party",
      },
      {
        label: "Family",
        IconComponent: SidebarSVG.Family,
        href: "/category/family",
      },
      {
        label: "Multiplayers",
        IconComponent: SidebarSVG.BoardGame,
        href: "/category/multiplayers",
        children: [
          {
            label: "Dual",
            IconComponent: SidebarSVG.BoardGame,
            href: "/category/multiplayers/dual",
          },
          {
            label: "Co-op",
            IconComponent: SidebarSVG.Coop,
            href: "/category/multiplayers/co-op",
          },
          {
            label: "Party",
            IconComponent: SidebarSVG.Party,
            href: "/category/multiplayers/party",
          },
        ],
      },
      {
        label: "Puzzle",
        IconComponent: SidebarSVG.Party,
        href: "/category/puzzle",
      },
      {
        label: "Strategy",
        IconComponent: SidebarSVG.Strategy,
        href: "/category/strategy",
      },
      {
        label: "Solo",
        IconComponent: SidebarSVG.Solo,
        href: "/category/solo",
      },
      {
        label: "Boardgame",
        IconComponent: SidebarSVG.BoardGame,
        href: "/category/boardgame",
      },
      {
        label: "Others",
        IconComponent: SidebarSVG.Others,
        href: "/category/others",
      },
    ],
  },
];
