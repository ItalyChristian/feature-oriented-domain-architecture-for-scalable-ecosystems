export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  items: SidebarNavItem[];
  activePath: string;
}

export interface SidebarNavProps {
  items: SidebarNavItem[];
  activePath: string;
  isCollapsed: boolean;
}

export interface SidebarNavItemProps {
  item: SidebarNavItem;
  isActive: boolean;
  isCollapsed: boolean;
}
