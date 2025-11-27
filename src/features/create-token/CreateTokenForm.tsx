"use client";

import { FormEvent, useState } from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/shared/components/ui/input-group";

export function CreateTokenForm() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    ticker: "",
    description: "",
  });

  const MAX_NAME = 80;
  const MAX_TICKER = 60;
  const MAX_DESCRIPTION = 280;

  const validate = () => {
    const newErrors = {
      name: "",
      ticker: "",
      description: "",
    };

    if (!name.trim()) newErrors.name = "Name is required";
    if (name.length > MAX_NAME) newErrors.name = `Max ${MAX_NAME} chars`;

    if (!ticker.trim()) newErrors.ticker = "Ticker is required";
    else if (!/^[A-Z0-9]{1,50}$/.test(ticker)) newErrors.ticker = "Only A–Z and digits (max 50)";

    if (description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters";

    if (description.length > MAX_DESCRIPTION)
      newErrors.description = `Max ${MAX_DESCRIPTION} chars`;

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Create token:", { name, ticker, description });
  };

  return (
    <section className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-8">
      <h2 className="text-lg font-semibold mb-4 text-white">1. Basic data</h2>

      <p className="text-sm text-zinc-400 mb-6">
        Once your coin/token has been minted, all information becomes immutable.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Name"
              maxLength={MAX_NAME}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
            />
          </InputGroup>

          <div className="flex justify-between mt-1">
            <p className="text-xs text-zinc-500">
              {name.length}/{MAX_NAME}
            </p>
            {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
          </div>
        </div>

        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Ticker"
              maxLength={MAX_TICKER}
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              aria-invalid={!!errors.ticker}
              className="uppercase"
            />
          </InputGroup>

          <div className="flex justify-between mt-1">
            <p className="text-xs text-zinc-500">
              {ticker.length}/{MAX_TICKER}
            </p>
            {errors.ticker && <p className="text-red-400 text-xs">{errors.ticker}</p>}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <InputGroup className="h-auto py-1">
            <InputGroupTextarea
              placeholder="Description"
              maxLength={MAX_DESCRIPTION}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-invalid={!!errors.description}
              className="min-h-[100px]"
            />
          </InputGroup>

          <div className="flex justify-between mt-1">
            <p className="text-xs text-zinc-500">
              {description.length}/{MAX_DESCRIPTION}
            </p>
            {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
          </div>
        </div>
      </form>
    </section>
  );
}
