"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function PurchaseButtons() {
  const [copied, setCopied] = useState(false);
  const CA = "GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump";

  const handleCopyCA = async () => {
    try {
      await navigator.clipboard.writeText(CA);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-wrap justify-end gap-3 absolute top-4 right-9 z-50 max-w-1/2 sm:max-w-full">
      <button
        onClick={handleCopyCA}
        className="px-2 sm:px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 text-center flex items-center gap-2 transition-all duration-200"
      >
        CA: {CA.slice(0, 4)}...{CA.slice(-4)}
        {copied ? (
          <FiCheck className="w-4 h-4 text-green-400" />
        ) : (
          <FiCopy className="w-4 h-4" />
        )}
      </button>
      <a
        href="https://pump.fun/coin/GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 sm:px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-center"
      >
        Buy CJET on Pump
      </a>
      <a
        href="https://moonshot.com/GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 sm:px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-center"
      >
        Buy CJET on Moonshot
      </a>
    </div>
  );
}
