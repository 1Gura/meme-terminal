import {useQuery} from "@tanstack/react-query";
import {tokenService} from "@/shared/api/token/token-service";

const STATIC_VERSION = '1';

export function useTokensQuery(page: string) {
    return useQuery({
        queryKey: ["tokens", page],
        queryFn: () =>
            tokenService.getTokens({
                page,
                version: STATIC_VERSION,
            }),
        staleTime: 5000,
    });
}
