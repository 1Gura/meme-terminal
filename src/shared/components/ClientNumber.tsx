"use client";

import { useEffect, useState } from "react";

export function ClientNumber({
  value,
  options = {},
}: {
  value: number;
  options?: Intl.NumberFormatOptions;
}) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    setFormatted(new Intl.NumberFormat("en-US", options).format(value));
  }, [value, options]);

  return <>{formatted}</>;
}
