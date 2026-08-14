'use client';

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// Exemplo de provider que CONHECE regra de negócio (sessão, usuário
// autenticado) — por isso vive em features/auth/, não em shared/.

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // Placeholder: em um cenário real, isso chamaria features/auth/api.ts
  const { data: user, isLoading } = useQuery({
    queryKey: ['session-user'],
    queryFn: async () => null as User | null,
  });

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}
