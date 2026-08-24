import type { SidebarProps } from './Sidebar.types';
import { SidebarNav } from './SidebarNav';
import { useSidebar } from './useSidebar';
import { SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED } from './Sidebar.constants';

export function Sidebar({ items, activePath }: Readonly<SidebarProps>) {
  const { isCollapsed, toggleCollapsed } = useSidebar();

  return (
    <aside
      style={{
        width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        transition: 'width 150ms ease',
        borderRight: '1px solid var(--border-color, #e5e7eb)',
        padding: 16,
      }}
    >
      <button type="button" onClick={toggleCollapsed} aria-label="Alternar menu">
        {isCollapsed ? '»' : '«'}
      </button>

      <SidebarNav items={items} activePath={activePath} isCollapsed={isCollapsed} />
    </aside>
  );
}
