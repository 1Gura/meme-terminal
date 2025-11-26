// features/terminal/hooks/useInfiniteTokens.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { TokenItem, tokenService } from "@/shared/api/token/token-service";

const STATIC_VERSION = "1";

export interface TokensPage {
  page: number;
  tokens: TokenItem[];
  hasMore: boolean;
}

export function useInfiniteTokens() {
  return useInfiniteQuery<
    TokensPage, // type of each page
    Error, // error type
    TokensPage, // result type after select
    ["tokens-infinite"], // query key
    number // page param type
  >({
    queryKey: ["tokens-infinite"],
    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await tokenService.getTokens({
        page: String(pageParam),
        version: STATIC_VERSION,
      });

      /**
       * API возвращает не массив, а объект формата:
       * { "TOKEN_ADDRESS": { ...token }, ... }
       * => превращаем в массив
       */
      const tokens: TokenItem[] = Object.values(response.tokens ?? {});

      return {
        page: pageParam,
        tokens,
        hasMore: tokens.length > 0, // простая логика – раз есть токены, значит есть еще
      };
    },

    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),

    retry: 5,
    retryDelay: (attempt) => Math.min(2 ** attempt * 500, 8000),
    staleTime: 5000,
  });
}
