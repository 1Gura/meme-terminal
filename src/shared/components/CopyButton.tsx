import {useState} from "react";
import {Check, Copy} from "lucide-react";

export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);

            setTimeout(() => setCopied(false), 1000); // Вернуть через 1 сек
        } catch (e) {
            console.error("Copy failed:", e);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="ml-2 p-1 text-zinc-400 hover:text-white transition"
        >
            {copied ? (
                <Check className="w-4 h-4 text-green-400" />
            ) : (
                <Copy className="w-4 h-4" />
            )}
        </button>
    );
}
