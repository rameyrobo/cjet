"use client";


import { useState } from "react";
import { Tooltip } from "components/Tooltip/Tooltip";
import { iconLibrary } from "resources/icons";

interface WalletAddressButtonProps {
  address: string;
  truncate?: number;
  className?: string;
}

export default function WalletAddressButton({ address, truncate = 6, className }: WalletAddressButtonProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const ClipboardIcon = iconLibrary.clipboard as React.ElementType;

  const truncated = address.length > truncate * 2
    ? `${address.slice(0, truncate)}...${address.slice(-truncate)}`
    : address;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTooltipOpen(true);
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 1200);
    } catch {}
  };

  return (
    <Tooltip
      explainer={copied ? "Text copied to your clipboard" : "Click to copy to clipboard"}
      withArrow
      side="top"
      open={tooltipOpen || hovered}
      onOpenChange={setTooltipOpen}
    >
      <button
        type="button"
        className={
          className ??
          `bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition relative flex items-center min-h-[2.5rem] cursor-pointer ${hovered ? "py-2 min-h-[3.5rem]" : ""}`
        }
        onClick={handleCopy}
        aria-label="Copy wallet address"
        style={{ position: 'relative', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className={`break-all text-left mr-2 w-full ${hovered ? "whitespace-normal" : "whitespace-nowrap"}`}>
          {hovered ? address : truncated}
        </span>
        {ClipboardIcon && <ClipboardIcon className="inline-block text-lg" />}
      </button>
    </Tooltip>
  );
}
