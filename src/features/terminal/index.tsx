"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import Image from "next/image";
import { useTokensQuery } from "@/shared/hooks/use-token-query";
import { mockData } from "@/mocks/terminal-data.mock";
import { ClientTime } from "@/shared/components/ClientTime";
import { ClientNumber } from "@/shared/components/ClientNumber";
import { shortAddress } from "@/shared/utils";
import { CopyButton } from "@/shared/components/CopyButton";
import { TradeButton } from "./TradeButton";

function Terminal() {
  const { data, isLoading } = useTokensQuery("1");

  // пока используем мок
  const tokens = mockData;

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
      <div className="mt-10 rounded-xl overflow-hidden border border-zinc-800 bg-[#0c121c]">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800">
              <TableHead className="col-span-2">TOKEN</TableHead>
              <TableHead>CA</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>MARKET CAP</TableHead>
              <TableHead>PROGRESS</TableHead>
              <TableHead className="flex items-center justify-end"># HOLDERS</TableHead>
              <TableHead className="text-right min-w-[140px]">TRADE</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/*{(*/}
            {/*    <TableRow>*/}
            {/*        <TableCell*/}
            {/*            colSpan={6}*/}
            {/*            className="text-center py-10 text-zinc-500"*/}
            {/*        >*/}
            {/*            Loading tokens...*/}
            {/*        </TableCell>*/}
            {/*    </TableRow>*/}
            {/*)}*/}

            {tokens.map((token) => (
              <TableRow
                key={token._id}
                className="border-zinc-800 hover:bg-zinc-800/30 transition cursor-pointer"
              >
                {/* TOKEN */}
                <TableCell className="col-span-2 min-w-[220px] whitespace-normal break-words">
                  <div className="flex items-center gap-4">
                    {token.photo ? (
                      <Image
                        width={48}
                        height={48}
                        src={token.photo}
                        alt={token.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-zinc-700" />
                    )}

                    <div>
                      <div className="font-medium text-white">{token.name}</div>

                      {/* Клиентский вывод времени */}
                      <div className="text-xs text-zinc-500">
                        <ClientTime date={token.createdAt} />
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* CA */}
                <TableCell className="min-w-[180px]">
                  <div className="flex items-center">
                    <span className="text-blue-400 cursor-pointer font-mono w-[100px]">
                      {shortAddress(token.token, 4, 4)}
                    </span>

                    <CopyButton text={token.token} />
                  </div>

                  {/* Creator */}
                  <div className="text-xs text-zinc-500 flex gap-1">
                    <span>by</span>
                    <span className="text-blue-400 font-mono">
                      {shortAddress(token.creator, 4, 4)}
                    </span>
                  </div>
                </TableCell>

                {/* VOLUME */}
                <TableCell className="col-span-2 min-w-[140px] whitespace-normal break-words">
                  <div className="flex flex-col">
                    <span className="text-white">
                      <ClientNumber
                        value={token.marketCapUsd ?? 0}
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
                <TableCell className="col-span-2 min-w-[140px] whitespace-normal break-words">
                  <div className="flex flex-col">
                    <span className="text-white">${(token.marketCapUsd ?? 0).toFixed(2)}</span>
                    <span className="text-xs text-zinc-500">${token.priceUsd?.toFixed(4)}</span>
                  </div>
                </TableCell>

                {/* PROGRESS */}
                <TableCell className="col-span-2 min-w-[240px] whitespace-normal break-words">
                  <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-400"
                      style={{ width: `${(token.progress ?? 0) * 100}%` }}
                    />
                  </div>
                </TableCell>

                {/* HOLDERS */}
                <TableCell className="flex justify-end col-span-2 min-w-[140px] whitespace-normal break-words">
                  {token.holders}
                </TableCell>
                {/* TRADE BUTTON */}
                <TableCell className="text-right min-w-[140px]">
                  <TradeButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Terminal;
