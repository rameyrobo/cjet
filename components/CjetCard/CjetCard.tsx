"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Text } from "components/SiteText/MarkdownText";
import { iconLibrary } from "../../resources/icons";

const InstagramIcon = iconLibrary.instagram;
const TwitterIcon = iconLibrary.twitter;
const TelegramIcon = iconLibrary.telegram;


interface PairData {
  baseToken: { name: string; symbol: string };
  priceUsd: string;
  liquidity: { usd: number };
  volume: { h24: number };
  marketCap: number;
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
        const res = await fetch("/api/dexscreener")
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const json = (await res.json()) as PairData[] | { error?: string }
        if (Array.isArray(json) && json.length > 0) {
          const first = json[0]
          if (first && mounted) setPair(first)
        } else {
          console.error("Unexpected Dexscreener API response", json)
        }
      } catch (err) {
        console.error("Failed to fetch Dexscreener data", err)
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

  if (!pair) return <div>Loading data...</div>;

  return (
    <div className="max-w-xl ml-0 rounded-2xl shadow-lg p-6 bg-stone-100 opacity-95 animate-fade-up animate-duration-1000 animate-delay-600 animate-ease-in-out">
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

      {/* Stats grid section */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Each stat box 
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4">
          <div className="text-2xl font-extrabold text-gray-900">41,913</div>
          <div className="text-base text-gray-600 font-medium mt-1">Holders</div>
        </div>
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4">
          <div className="text-2xl font-extrabold text-gray-900">74,643</div>
          <div className="text-base text-gray-600 font-medium mt-1">Followers</div>
        </div>
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4">
          <div className="text-2xl font-extrabold text-gray-900">64</div>
          <div className="text-base text-gray-600 font-medium mt-1">Integrations</div>
        </div> */}
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4">
          <div className="text-2xl font-extrabold text-gray-900">{pair.marketCap >= 1e6 ? "$" + (pair.marketCap/1e6).toFixed(0) + "M" : "$" + pair.marketCap.toLocaleString()}</div>
          <div className="text-base text-gray-600 font-medium mt-1">Market Cap</div>
        </div>
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4">
          <div className="text-2xl font-extrabold text-gray-900">{pair.volume.h24 >= 1e6 ? "$" + (pair.volume.h24/1e6).toFixed(0) + "M" : "$" + pair.volume.h24.toLocaleString()}</div>
          <div className="text-base text-gray-600 font-medium mt-1">Volume 24h</div>
        </div>
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4">
          <div className="text-2xl font-extrabold text-gray-900">{pair.liquidity.usd >= 1e6 ? "$" + (pair.liquidity.usd/1e6).toFixed(1) + "M" : "$" + pair.liquidity.usd.toLocaleString()}</div>
          <div className="text-base text-gray-600 font-medium mt-1">DEX Liquidity</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <a
          href="https://pump.fun/coin/GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-center"
        >
          Buy CJET on Pump
        </a>
        <a
          href="https://moonshot.com/GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-center"
        >
          Buy CJET on Moonshot
        </a>
        
  {pair.info.websites?.filter(site => site.url !== "http://cjetcoin.com" && site.url !== "https://cjetcoin.com").map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#E1306C] text-white hover:bg-black text-center"
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
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-blue-600 capitalize text-center"
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
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 capitalize text-center"
        >
          {TelegramIcon && <span className="inline-block mr-2 align-middle"><TelegramIcon /></span>}
          Telegram
        </a>
      </div>
    </div>
  );
}