import { Card } from "@/shared/components/ui/card";
import { TokenItem } from "@/shared/api/token/token-service";
import Image from "next/image";

export function TokenCard({ token }: { token: TokenItem }) {
  const { photo, symbol, name } = token;

  return (
    <Card
      className="
        flex flex-row items-center gap-4
        px-5 py-3
        bg-[#0f141d]
        border border-zinc-800
        rounded-2xl
        w-[200px]
        h-[60px]
        shrink-0
      "
    >
      {/* ИКОНКА */}
      <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
        {photo ? (
          <Image
            src={photo}
            alt={symbol || "token"}
            width={36}
            height={36}
            className="object-cover w-full h-full"
            unoptimized
          />
        ) : null}
      </div>

      {/* ТЕКСТ */}
      <div className="flex flex-col overflow-hidden min-w-0">
        <span className="text-white text-base font-semibold truncate">{symbol || "NO SYMBOL"}</span>

        <span className="text-zinc-400 text-sm truncate">{name || "No name"}</span>
      </div>
    </Card>
  );
}
