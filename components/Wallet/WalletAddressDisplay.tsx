// components/Wallet/WalletAddressDisplay.tsx
"use client";
import { getWalletAddress } from "components/SiteText/MarkdownText";
import WalletAddressButton from "components/Wallet/WalletAddressButton";

export default function WalletAddressDisplay({ title }: { title: string }) {
  const address = getWalletAddress(title);
  if (!address) return null;
  return <WalletAddressButton address={address} />;
}