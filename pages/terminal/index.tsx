import Terminal from "features/terminal";
import { useTokensQuery } from "../../src/shared/hooks/use-token-query";

const INITIAL_PAGE = "1";

export default function TerminalPage() {
  const { data, isLoading } = useTokensQuery(INITIAL_PAGE);

  return <Terminal initialTokens={data ?? []} isLoading={isLoading} />;
}
