import Terminal from "features/terminal";
import { useTokensQuery } from "../../src/shared/hooks/use-token-query";
import { useState } from "react";

const INITIAL_PAGE = "1";

export default function TerminalPage() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const { data, isLoading } = useTokensQuery(page);

  return <Terminal initialTokens={data ?? []} isLoading={isLoading} setPage={setPage} />;
}
