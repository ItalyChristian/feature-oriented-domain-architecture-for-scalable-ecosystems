'use client';

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
//    Cada provider é implementado no lugar certo e apenas importado aqui.
//    Agnóstico de negócio → shared/. Conhece domínio → features/<dominio>/.
import { createQueryClient } from '../shared/lib/query-client';
import { ThemeProvider } from '../shared/providers/ThemeProvider';
import { UserProvider } from '../features/auth/UserProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Composição central de todos os providers da aplicação.
 *
 * Regra: este arquivo apenas COMPÕE — nunca implementa um provider aqui
 * dentro. Se você está prestes a criar um `createContext` neste arquivo,
 * pare: a implementação pertence a `shared/providers/` (se agnóstica de
 * negócio) ou `features/<dominio>/` (se conhece regra de negócio).
 *
 * Ordem de composição (de fora para dentro) — documentada porque a ordem
 * importa e não deve ser alterada sem entender a dependência implícita:
 *
 * 1. ThemeProvider    — não depende de nada, pode envolver tudo.
 * 2. QueryClientProvider — data-fetching não depende de sessão para existir.
 * 3. UserProvider     — depende do QueryClient já disponível, pois carrega
 *                        a sessão do usuário via query.
 */
export function AppProviders({ children }: Readonly<AppProvidersProps>) {
  // useState garante que cada sessão de client tenha sua própria instância,
  // evitando compartilhar estado entre requisições diferentes no server.
  const [queryClient] = useState(() => createQueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>{children}</UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
