import { useQuery } from "@tanstack/react-query";
import { tokenService } from "@/shared/api/token/token-service";
import { PumpfunToken } from "@/shared/ws/ws.types";

const STATIC_VERSION = "1";

export function useTokensQuery(page: string) {
  return useQuery({
    queryKey: ["tokens", page],

    queryFn: () =>
      tokenService.getTokens({
        page,
        version: STATIC_VERSION,
      }),

    select: (data: Record<string, PumpfunToken>) => {
      return Object.values(data.tokens);
    },

    retry: 5,
    retryDelay: (attempt) => Math.min(2 ** attempt * 500, 8000),
    staleTime: 5000,
  });
}
