import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { ClientNumber } from "@/shared/components/ClientNumber";
import { shortAddress } from "@/shared/utils";
import { CopyButton } from "@/shared/components/CopyButton";
import { TradeButton } from "./TradeButton";
import { useEffect, useState } from "react";
import { PumpfunToken } from "@/shared/ws/ws.types";
import { SafeImage } from "@/shared/components/SafeImage";
import { TinyPrice } from "@/shared/components/FormatTinyNumber";
import { connect } from "@/shared/ws/ws.native";
import { TradeRowSkeleton } from "./TradeRowSkeleton";
import { ClientTime } from "@/shared/components/ClientTime";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";

interface TerminalProps {
  initialTokens?: PumpfunToken[];
  isLoading?: boolean;
  error?: Error | null;
}

function Terminal({ initialTokens, isLoading = true }: TerminalProps) {
  const [tokens, setTokens] = useState<PumpfunToken[] | undefined>(initialTokens);
  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFallbackActive(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [initialTokens]);

  useEffect(() => {
    setTokens(initialTokens);
  }, [initialTokens]);

  useEffect(() => {
    const ws = connect(
      "wss://launch.meme/connection/websocket",
      ["pumpfun-mintTokens", "pumpfun-tokenUpdates"],
      (channel, data) => {
        // Новые токены — добавляем
        if (channel === "pumpfun-mintTokens") {
          setTokens((prev) => {
            if (prev) {
              // если уже есть — не добавляем повтор
              if (prev.some((t) => t.token === data.token)) return prev;
              return [data, ...prev].slice(0, 50);
            }
          });
        }

        if (channel === "pumpfun-tokenUpdates") {
          setTokens((prev) => {
            if (prev) {
              return prev.map((t) =>
                t.token === data.token
                  ? { ...t, ...data } // обновляем только существующий
                  : t
              );
            }
          });
        }
      }
    );

    return () => ws?.close?.();
  }, []);
  debugger;
  return (
    <div className="w-full mx-auto">
      <div className="mt-8 flex items-center gap-3">
        <input
          className="w-full h-12 rounded-xl bg-[#111827] px-4 text-sm text-zinc-300 border border-zinc-700 focus:outline-none"
          placeholder="Search tokens..."
        />
        <button className="h-12 w-12 rounded-xl bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition">
          🔍
        </button>
      </div>

      {/* TABLE */}
      <div
        className="mt-10 rounded-xl border border-zinc-800 bg-[#0c121c]"
        style={{ maxHeight: "calc(100vh - 220px)" }}
      >
        <div className="overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="min-w-[220px]">TOKEN</TableHead>
                <TableHead className="min-w-[140px]">CA</TableHead>
                <TableHead className="min-w-[140px]">VOLUME</TableHead>
                <TableHead className="min-w-[140px]">MARKET CAP</TableHead>
                <TableHead className="min-w-[240px]">PROGRESS</TableHead>
                <TableHead className="min-w-[140px] text-right"># HOLDERS</TableHead>
                <TableHead className="min-w-[140px] text-right">TRADE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!fallbackActive && isLoading
                ? Array.from({ length: 10 }, (_, i) => <TradeRowSkeleton key={i} />)
                : tokens?.map((token) => {
                    debugger;
                    return (
                      <TableRow
                        key={token.token}
                        className="border-zinc-800 hover:bg-zinc-800/30 transition cursor-pointer"
                      >
                        {/* TOKEN */}
                        <TableCell className="min-w-[220px] whitespace-normal break-words">
                          <div className="flex items-center gap-4">
                            {/* ==== АВАТАР + ВРЕМЯ ==== */}
                            {token.photo ? (
                              <div className="flex flex-col items-center">
                                <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden bg-[#1f2937]">
                                  <SafeImage
                                    width={48}
                                    height={48}
                                    src={token.photo}
                                    alt={token.name}
                                    className="w-12 h-12 rounded-xl object-cover"
                                  />
                                </div>

                                <div className="text-xs text-zinc-500 pt-1 text-center">
                                  <ClientTime date={token.mint_time.toString()} />
                                </div>
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-zinc-700" />
                            )}

                            {/* ==== ТЕКСТ ==== */}
                            <div className="max-w-[260px]">
                              {/* SYMBOL / NAME */}
                              <div className="font-medium text-white truncate block">
                                {token.symbol} / {token.name}
                              </div>

                              {/* DESCRIPTION (2 строки + tooltip) */}
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className="
                                    font-medium text-white/80
                                    text-sm
                                    line-clamp-2
                                    cursor-help
                                    max-w-[260px]
                                  "
                                  >
                                    {token.description}
                                  </div>
                                </TooltipTrigger>

                                <TooltipContent className="max-w-xs leading-relaxed">
                                  {token.description}
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </TableCell>

                        {/* CA */}
                        <TableCell className="min-w-[140px]">
                          <div className="flex items-center">
                            <span className="text-blue-400 cursor-pointer font-mono w-[100px]">
                              {shortAddress(token.token, 4, 4)}
                            </span>
                            <CopyButton text={token.token} />
                          </div>

                          <div className="text-xs text-zinc-500 flex gap-1">
                            <span>by</span>
                            <span className="text-blue-400 font-mono">
                              {shortAddress(token.creator, 4, 4)}
                            </span>
                          </div>
                        </TableCell>

                        {/* VOLUME */}
                        <TableCell className="min-w-[140px]">
                          <div className="flex flex-col">
                            <span className="text-white">
                              <ClientNumber
                                value={token.volumeUsd ?? 0}
                                options={{
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }}
                              />
                            </span>
                            <span className="text-xs">
                              <span className="text-green-400">{token.buys}</span> /{" "}
                              <span className="text-red-400">{token.sells}</span>
                            </span>
                          </div>
                        </TableCell>

                        {/* MARKET CAP */}
                        <TableCell className="min-w-[140px]">
                          <div className="flex flex-col">
                            <span className="text-white">${token.marketCapUsd?.toFixed(2)}</span>
                            <TinyPrice className="text-xs text-zinc-500" value={token.priceUsd} />
                          </div>
                        </TableCell>

                        {/* PROGRESS */}
                        <TableCell className="min-w-[240px]">
                          <div className="flex flex-col gap-1.5">
                            <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-400 transition-all"
                                style={{ width: `${(token.progress ?? 0) * 100}%` }}
                              />
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {Math.round((token.progress ?? 0) * 100)}%
                            </div>
                          </div>
                        </TableCell>

                        {/* HOLDERS */}
                        <TableCell className="text-right min-w-[140px]">{token.holders}</TableCell>

                        {/* TRADE */}
                        <TableCell className="text-right min-w-[140px]">
                          <TradeButton />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
