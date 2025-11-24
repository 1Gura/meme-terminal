"use client";

interface TinyPriceProps {
  value: number;
  currency?: string;
  className?: string;
}

// Форматирование числа в стиль pump.fun
function formatTinyPrice(value: number, currency: string) {
  if (!value || !isFinite(value)) return `${currency}0.0`;

  const raw = value.toString(); // "0.00005643", "0.00000012345" и т.д.

  // Ищем шаблон: 0. + нули + значимые цифры
  const match = raw.match(/^0\.(0+)(\d+)/);

  if (!match) {
    // Если число не tiny — обычный формат
    return `${currency}${value.toFixed(4)}`;
  }

  const zeros = match[1].length; // количество нулей после точки
  const rest = match[2].slice(0, 4); // значимые цифры, максимум 4

  // ВАЖНО: "0.0" + <sub>степень</sub> + цифры
  return `${currency}0.0<sub>${zeros}</sub>${rest}`;
}

export function TinyPrice({ value, currency = "$", className = "" }: TinyPriceProps) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: formatTinyPrice(value, currency),
      }}
    />
  );
}
