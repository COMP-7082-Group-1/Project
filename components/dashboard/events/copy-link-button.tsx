// components/dashboard/events/copy-link-button.tsx
"use client";

/** Button that copies the public event URL to the clipboard with visual feedback. */
import { useState } from "react";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-sm px-3 py-1.5 rounded-md border hover:bg-muted transition-colors"
    >
      {copied ? "Copied!" : "Copy Event Link"}
    </button>
  );
}