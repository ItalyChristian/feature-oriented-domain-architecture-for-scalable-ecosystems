import { useState } from 'react';
import { SIDEBAR_COLLAPSE_STORAGE_KEY } from './Sidebar.constants';

/**
 * Controla o estado de colapso do Sidebar.
 *
 * Único hook do componente — por isso fica solto na raiz da pasta
 * (`useSidebar.ts`), sem precisar de subpasta `/hooks`. Se um segundo
 * hook aparecer aqui (ex: um hook separado de atalhos de teclado), aí
 * sim migra para `/hooks`.
 */
export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      // Placeholder: em um cenário real, persistiria a preferência.
      // localStorage.setItem(SIDEBAR_COLLAPSE_STORAGE_KEY, String(next))
      return next;
    });
  };

  return { isCollapsed, toggleCollapsed };
}
