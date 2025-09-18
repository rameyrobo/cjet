"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { iconLibrary, IconName } from "../../resources/icons";

const InstagramIcon = iconLibrary.instagram;
const TwitterIcon = iconLibrary.twitter;
const TelegramIcon = iconLibrary.telegram;


interface PairData {
  baseToken: { name: string; symbol: string };
  priceUsd: string;
  liquidity: { usd: number };
  volume: { h24: number };
  info: {
    imageUrl: string;
    websites?: { label: string; url: string }[];
    socials?: { type: string; url: string }[];
  };
}

export default function CjetCard() {
  const [pair, setPair] = useState<PairData | null>(null);

  useEffect(() => {
    let mounted = true

    async function fetchAndSet() {
      try {
        const res = await fetch("/api/cjet")
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const json = (await res.json()) as PairData[] | { error?: string }
        if (Array.isArray(json) && json.length > 0) {
          const first = json[0]
          if (first && mounted) setPair(first)
        } else {
          console.error("Unexpected CJET API response", json)
        }
      } catch (err) {
        console.error("Failed to fetch CJET data", err)
      }
    }

    // initial fetch
    fetchAndSet()
    // refresh every 30s
    const interval = setInterval(fetchAndSet, 30000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  if (!pair) return <div>Loading CJET data...</div>;

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-lg p-6 bg-white">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={pair.info.imageUrl}
            alt={pair.baseToken.symbol}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">
          {pair.baseToken.name} ({pair.baseToken.symbol})
        </h2>
      </div>

      <p className="mt-4 text-lg">
        💵 Price:{" "}
        <span className="font-semibold">
          ${Number(pair.priceUsd).toFixed(6)}
        </span>
      </p>
      <p>📊 Liquidity: ${pair.liquidity.usd.toLocaleString()}</p>
      <p>📈 24h Volume: ${pair.volume.h24.toLocaleString()}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <a
          href="https://pump.fun/coin/GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Buy CJET on Pump
        </a>
        <a
          href="https://moonshot.com/GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Buy CJET on Moonshot
        </a>
        
  {pair.info.websites?.filter(site => site.url !== "http://cjetcoin.com" && site.url !== "https://cjetcoin.com").map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#E1306C] text-white hover:bg-black"
          >
            {/* IG icon for Instagram links */}
            {site.label.toLowerCase().includes("instagram") && InstagramIcon && (
              <span className="inline-block mr-2 align-middle"><InstagramIcon /></span>
            )}
            {site.label}
          </a>
        ))}
        {pair.info.socials?.map((social) => (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-blue-600 capitalize"
          >
            {/* Twitter icon for Twitter links */}
            {social.type.toLowerCase() === "twitter" && TwitterIcon && (
              <span className="inline-block mr-2 align-middle"><TwitterIcon /></span>
            )}
            {/* IG icon for Instagram links */}
            {social.type.toLowerCase() === "instagram" && InstagramIcon && (
              <span className="inline-block mr-2 align-middle"><InstagramIcon /></span>
            )}
            {social.type}
          </a>
        ))}
        <a
          href="https://t.me/+FyJ3DWT4zzQwMjQx"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 capitalize"
        >
          {TelegramIcon && <span className="inline-block mr-2 align-middle"><TelegramIcon /></span>}
          Telegram
        </a>
      </div>
    </div>
  );
}