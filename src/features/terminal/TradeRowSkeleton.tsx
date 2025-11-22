import { TableCell, TableRow } from "@/shared/components/ui/table";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function TradeRowSkeleton() {
  return (
    <TableRow className="border-zinc-800">
      {/* TOKEN */}
      <TableCell className="min-w-[220px]">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </TableCell>

      {/* CA */}
      <TableCell className="min-w-[140px]">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-20" />
      </TableCell>

      {/* VOLUME */}
      <TableCell className="min-w-[140px]">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-3 w-16" />
      </TableCell>

      {/* MARKET CAP */}
      <TableCell className="min-w-[140px]">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-3 w-16" />
      </TableCell>

      {/* PROGRESS BAR */}
      <TableCell className="min-w-[240px]">
        <Skeleton className="h-2 w-full rounded-full" />
      </TableCell>

      {/* HOLDERS */}
      <TableCell className="min-w-[140px] text-right">
        <Skeleton className="h-4 w-12 ml-auto" />
      </TableCell>

      {/* TRADE BUTTON */}
      <TableCell className="min-w-[140px] text-right">
        <Skeleton className="h-8 w-[90px] rounded-lg ml-auto" />
      </TableCell>
    </TableRow>
  );
}
