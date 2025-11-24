import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { PumpfunTokenEvent } from "@/shared/ws/ws.types";
import { connect } from "@/shared/ws/ws.native";

export function PumpfunMintFeed() {
  const [items, setItems] = useState<PumpfunTokenEvent[]>([]);

  useEffect(() => {
    const ws = connect((data) => {
      setItems((prev) => [data, ...prev].slice(0, 30));
    });

    return () => ws?.close?.();
  }, []);

  return (
    <div className="p-4 max-h-[400px] overflow-y-auto">
      {items.length === 0 && (
        <div className="text-orange-300 text-sm opacity-70">Waiting for mint events...</div>
      )}

      <div className="mt-4">
        {items.map((item) => (
          <Card
            key={item.token}
            className="bg-[#0f141b] border border-orange-500/20 rounded-xl shadow-md p-4 w-full"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-orange-300 truncate">
                {item.name}
              </CardTitle>
              <CardDescription className="text-xs text-orange-200/70">
                Minted: {new Date(item.mint_time).toLocaleString()}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-orange-100">
              <div className="flex flex-col">
                <span className="font-semibold text-orange-300">Creator:</span>
                <span className="truncate max-w-full text-orange-200">{item.creator}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-orange-300 font-medium">Price (SOL):</span>
                <span className="text-orange-200">{item.priceSol}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-orange-300 font-medium">Holders:</span>
                <span className="text-orange-200">{item.holders}</span>
              </div>
            </CardContent>

            <CardFooter className="pt-3">
              <span className="text-xs text-orange-300/60 italic">Live mint event detected 🔥</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
