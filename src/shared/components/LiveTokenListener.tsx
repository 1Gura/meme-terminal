import { useEffect, useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/shared/components/ui/item";

import { WebsocketChannels } from "@/shared/ws/ws.channels";
import { wsService } from "@/shared/ws/ws.service";

type LiveTokenEvent = WebsocketChannels["meteora-tokenUpdates"];

export function LiveTokensListener() {
  const [events, setEvents] = useState<LiveTokenEvent[]>([]);

  useEffect(() => {
    const ws = wsService; // <-- инстанс, а не функция

    const sub = ws.subscribe("pumpfun-mintTokens", (data) => {
      console.log("WS DATA:", data);
    });

    return () => {
      sub?.unsubscribe();
    };
  }, []);

  const isEmpty = events.length === 0;

  return (
    <div className="p-4 mt-4 border border-orange-500/20 rounded-xl bg-black/20 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(255,165,0,0.5)]" />
        <div className="text-sm font-semibold text-orange-300 tracking-wide">
          Live Token Updates
        </div>
      </div>

      {/* No data yet */}
      {isEmpty ? (
        <div className="text-xs text-orange-200/70 italic flex items-center gap-3 py-4">
          <svg
            className="animate-spin text-orange-400"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <circle cx="12" cy="12" r="9" strokeOpacity="0.25" className="text-orange-300" />
            <path d="M21 12a9 9 0 00-9-9" className="text-orange-400" strokeLinecap="round" />
          </svg>
          Waiting for real-time updates…
        </div>
      ) : (
        <ItemGroup className="space-y-2">
          {events.map((ev, i) => (
            <Item
              key={i}
              variant="muted"
              size="sm"
              className="bg-[#141a23]/70 border border-orange-500/20 shadow-sm hover:bg-[#1c2432]/70 transition-colors"
            >
              <ItemMedia variant="icon" className="bg-orange-500/30 border-orange-500/40">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffa64d"
                  strokeWidth="2"
                >
                  <path d="M12 2l7 7-7 7-7-7z" />
                </svg>
              </ItemMedia>

              <ItemContent>
                <ItemTitle className="text-orange-200">
                  {ev.ca.slice(0, 6)}…{ev.ca.slice(-3)}
                </ItemTitle>

                <ItemDescription>
                  <span className="text-orange-300">Price:</span> ${ev.price}
                  <br />
                  <span className="text-orange-300">Volume:</span> {ev.volume}
                  <br />
                  <span className="text-orange-300">Progress:</span> {Math.round(ev.progress * 100)}
                  %
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
