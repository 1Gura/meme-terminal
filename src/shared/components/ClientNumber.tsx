interface ClientNumberProps {
  value: number | string | null;
  currency?: string; // выводим перед числом
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
  className?: string;
}

export function ClientNumber({
  value,
  currency = "$",
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  className = "",
}: ClientNumberProps) {
  if (value == null || isNaN(Number(value))) return <>0</>;

  const formatted = new Intl.NumberFormat("en-US", options).format(Number(value));

  return (
    <span className={className}>
      {currency}
      {formatted}
    </span>
  );
}
