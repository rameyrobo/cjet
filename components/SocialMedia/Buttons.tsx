"use client";
import React, { useEffect, useState } from "react";
import { iconLibrary } from "../../resources/icons";

interface PairData {
  info: {
    websites?: { label: string; url: string }[];
    socials?: { type: string; url: string }[];
  };
}
const InstagramIcon = iconLibrary.instagram;
const TwitterIcon = iconLibrary.twitter;
const TelegramIcon = iconLibrary.telegram;

export default function SocialMediaButtons() {
  const [pair, setPair] = useState<PairData | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchAndSet() {
      try {
        const res = await fetch("/api/dexscreener");
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = (await res.json()) as PairData[] | { error?: string };
        if (Array.isArray(json) && json.length > 0) {
          const first = json[0];
          if (first && mounted) setPair(first);
        } else {
          console.error("Unexpected Dexscreener API response", json);
        }
      } catch (err) {
        console.error("Failed to fetch Dexscreener data", err);
      }
    }
    fetchAndSet();
    const interval = setInterval(fetchAndSet, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-start gap-3 absolute top-4 left-14 lg:left-12 z-50">
      {/* Instagram website links */}
      {pair?.info.websites?.filter(site => site.label.toLowerCase().includes("instagram") && site.url !== "http://cjetcoin.com" && site.url !== "https://cjetcoin.com").map((site) => (
        <a
          key={site.url}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          {InstagramIcon && (
            <span className="inline-block align-middle text-white text-2xl"><InstagramIcon /></span>
          )}
        </a>
      ))}
      {/* Socials: Twitter, Instagram, Telegram */}
      {pair?.info.socials?.map((social) => (
        <a
          key={social.url}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          {social.type.toLowerCase() === "twitter" && TwitterIcon && (
            <span className="inline-block align-middle text-white text-2xl"><TwitterIcon /></span>
          )}
          {social.type.toLowerCase() === "instagram" && InstagramIcon && (
            <span className="inline-block align-middle text-white text-2xl"><InstagramIcon /></span>
          )}
        </a>
      ))}
      {/* Telegram static link */}
      <a
        href="https://t.me/+FyJ3DWT4zzQwMjQx"
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        {TelegramIcon && <span className="inline-block align-middle text-white text-2xl"><TelegramIcon /></span>}
      </a>
    </div>
  );
}