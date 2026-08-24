import type { SidebarNavItemProps } from './Sidebar.types';

/**
 * Subcomponente interno — não é exposto como compound component
 * (`Sidebar.NavItem`) porque não existe cenário em que um consumidor
 * externo precise compor um item de navegação fora do contexto do
 * próprio Sidebar. É detalhe de implementação, não uma peça reaproveitável
 * isoladamente — por isso o barrel (`index.ts`) exporta só `Sidebar`.
 */
export function SidebarNavItem({ item, isActive, isCollapsed }: Readonly<SidebarNavItemProps>) {
  return (
    <a
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? item.label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        borderRadius: 6,
        fontWeight: isActive ? 600 : 400,
        backgroundColor: isActive ? 'var(--sidebar-active-bg, #eef2ff)' : 'transparent',
        color: isActive ? 'var(--sidebar-active-fg, #4338ca)' : 'inherit',
        textDecoration: 'none',
      }}
    >
      {item.icon}
      {!isCollapsed && <span>{item.label}</span>}
    </a>
  );
}
