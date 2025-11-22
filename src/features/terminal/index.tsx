import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table";
import {mockData} from "@/mocks/terminal-data.mock";
import Image from "next/image";


function Terminal() {
    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* HEADER */}
            <h1 className="text-3xl font-bold text-white">Welcome to LaunchPad Terminal</h1>
            <p className="mt-2 max-w-xl text-zinc-400">
                Discover, trade and launch Solana meme tokens in one interface.
            </p>

            {/* SEARCH */}
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
                            <TableHead># HOLDERS</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {mockData.map((token) => (
                            <TableRow
                                key={token.id}
                                className="border-zinc-800 hover:bg-zinc-800/30 transition cursor-pointer"
                            >
                                {/* TOKEN */}
                                <TableCell className="col-span-2">
                                    <div className="flex items-center gap-4">
                                        {token.avatar ? (
                                            <Image
                                                src={token.avatar}
                                                alt={token.name}
                                                className="w-12 h-12 rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-zinc-700" />
                                        )}

                                        <div>
                                            <div className="font-medium text-white">{token.name}</div>
                                            <div className="text-xs text-zinc-500">{token.timestamp}</div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* CA */}
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-blue-400 cursor-pointer">{token.ca}</span>
                                        <span className="text-xs text-zinc-500">by {token.creator}</span>
                                    </div>
                                </TableCell>

                                {/* VOLUME */}
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-white">${token.volume.toLocaleString('en-US')}</span>
                                        <span className="text-xs">
                      <span className="text-green-400">{token.volumeBuy}</span> /{" "}
                                            <span className="text-red-400">{token.volumeSell}</span>
                    </span>
                                    </div>
                                </TableCell>

                                {/* MARKET CAP */}
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-white">${(token.marketCap / 1000).toFixed(1)}K</span>
                                        <span className="text-xs text-zinc-500">${token.price.toFixed(4)}</span>
                                    </div>
                                </TableCell>

                                {/* PROGRESS */}
                                <TableCell>
                                    <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-400"
                                            style={{ width: `${token.progress}%` }}
                                        />
                                    </div>
                                </TableCell>

                                {/* HOLDERS */}
                                <TableCell className="text-white">{token.holders}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Terminal;