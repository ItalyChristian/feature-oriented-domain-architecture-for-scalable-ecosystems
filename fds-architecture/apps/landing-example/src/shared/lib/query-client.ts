import { QueryClient } from '@tanstack/react-query';

// Configuração centralizada do QueryClient — agnóstica de negócio,
// por isso vive em shared/lib/, não em features/.

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  });
}
