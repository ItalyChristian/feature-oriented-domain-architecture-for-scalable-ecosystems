import type { SidebarNavItem } from './Sidebar.types';

/**
 * Determina se um item de navegação corresponde à rota ativa.
 * Considera prefixo de rota, não apenas igualdade exata — assim
 * `/dashboard/settings` também marca o item `/dashboard` como ativo.
 */
export function isNavItemActive(item: SidebarNavItem, activePath: string): boolean {
  if (item.href === '/') {
    return activePath === '/';
  }
  return activePath === item.href || activePath.startsWith(`${item.href}/`);
}
