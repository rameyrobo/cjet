"use client";
import { useEffect, useState } from "react";

interface PairData {
  baseToken: { name: string; symbol: string };
  priceUsd: string;
  liquidity: { usd: number };
  volume: { h24: number };
  marketCap: number;
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
    <div className="max-w-xl ml-0 rounded-2xl shadow-lg p-6 px-2 bg-transparent opacity-10 animate-fade-up animate-duration-1000 animate-delay-600 animate-ease-in-out">

      {/* Stats grid section */}
      <div className="mt-0 grid grid-cols-2 lg:grid-cols-1 lg:max-w-[408px] xl:grid-cols-2 gap-4">
        <a
          href="/assets/CJET_Whitepaper.pdf"
          download
          className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4 border-white hover:border-[#3dff00] border-8 hover:border-solid hover:scale-[1.05] transition-all duration-300"
        >
          <span className="px-4 py-2 rounded-xl text-black text-center font-extrabold">
            Download Whitepaper
          </span>
        </a>
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
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4 border-white border-solid border-8 hover:scale-[1.05] transition-all duration-300">
          <div className="text-xl font-extrabold text-gray-900">{pair.marketCap >= 1e6 ? "$" + (pair.marketCap/1e6).toFixed(0) + "M" : "$" + pair.marketCap.toLocaleString()}</div>
          <div className="text-base text-gray-600 font-medium mt-1 text-center">Market Cap</div>
        </div>
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4 border-white border-solid border-8 hover:scale-[1.05] transition-all duration-300">
          <div className="text-xl font-extrabold text-gray-900">{pair.volume.h24 >= 1e6 ? "$" + (pair.volume.h24/1e6).toFixed(0) + "M" : "$" + pair.volume.h24.toLocaleString()}</div>
          <div className="text-base text-gray-600 font-medium mt-1 text-center">Volume 24h</div>
        </div>
        <div className="rounded-2xl bg-white shadow-md flex flex-col items-center justify-center py-5 px-4 border-white border-solid border-8 hover:scale-[1.05] transition-all duration-300">
          <div className="text-xl font-extrabold text-gray-900">{pair.liquidity.usd >= 1e6 ? "$" + (pair.liquidity.usd/1e6).toFixed(1) + "M" : "$" + pair.liquidity.usd.toLocaleString()}</div>
          <div className="text-base text-gray-600 font-medium mt-1 text-center">DEX Liquidity</div>
        </div>
      </div>
    </div>
  );
}