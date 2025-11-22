import { Button } from "@/shared/components/ui/button";
import { ReactNode } from "react";
import TradeIcon from "./TradeIcon";

interface TradeButtonProps {
  children?: ReactNode;
}

export function TradeButton({ children }: TradeButtonProps) {
  return (
    <Button variant="orange">
      <TradeIcon /> Trade
    </Button>
  );
}
