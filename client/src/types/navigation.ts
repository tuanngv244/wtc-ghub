export interface NavItem {
  label: string;
  /** Hugeicons icon name (e.g. "hugeicons:home-04") */
  icon?: string;
  /** Path to a custom SVG icon in /public (e.g. "/images/sidebar/home.svg") */
  iconSvg?: string;
  /** React SVG icon component (e.g. HomeIcon from @/components/ui/icons/sidebar) */
  IconComponent?: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  href: string;
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
