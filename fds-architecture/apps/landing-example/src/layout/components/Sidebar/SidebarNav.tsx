import type { SidebarNavProps } from './Sidebar.types';
import { SidebarNavItem } from './SidebarNavItem';
import { isNavItemActive } from './Sidebar.utils';

export function SidebarNav({ items, activePath, isCollapsed }: Readonly<SidebarNavProps>) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {items.map((item) => (
        <SidebarNavItem
          key={item.id}
          item={item}
          isActive={isNavItemActive(item, activePath)}
          isCollapsed={isCollapsed}
        />
      ))}
    </nav>
  );
}
