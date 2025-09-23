"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";
import WalletAddressButton from "components/Wallet/WalletAddressButton";

// Helper to fetch wallet coin amounts from Moralis
async function fetchWalletCoinAmounts(addresses: string[]): Promise<Record<string, number>> {
  try {
    const res = await fetch("/api/moralis");
    const data = (await res.json()) as Array<{ address: string; portfolio: { tokens?: Array<{ symbol: string; amount: string | number }> } }>;
    const result: Record<string, number> = {};
    for (const item of data) {
      if (item.address && item.portfolio && Array.isArray(item.portfolio.tokens)) {
        // Find CJET token (symbol: "CJET")
        const cjetToken = item.portfolio.tokens.find(t => t.symbol === "CJET");
        if (cjetToken && cjetToken.amount) {
          const parsed = typeof cjetToken.amount === "string" ? parseFloat(cjetToken.amount) : cjetToken.amount;
          if (typeof parsed === "number" && !Number.isNaN(parsed)) {
            result[item.address] = parsed;
          }
        }
      }
    }
    return result;
  } catch {
    return {};
  }
}

// Helper to fetch CJET price from Dexscreener
async function fetchCJETPrice(): Promise<number | null> {
  try {
    const res = await fetch("/api/dexscreener");
    const data = await res.json();
    // Dexscreener returns an array, get priceUsd from first item
    if (Array.isArray(data) && data.length > 0 && typeof data[0].priceUsd === "string") {
      const price = parseFloat(data[0].priceUsd);
      if (!Number.isNaN(price)) return price;
    }
    return null;
  } catch {
    return null;
  }
}


// Add as many markdown sections as you want here
const markdownSections = [
  {
    title: "Project Description",
    content: `**Chris Joslin**, one of the most legendary skateboarders ever, once tried a 360 flip down the infamous El Toro 20 stair and was defeated. He said he wouldn’t try it again.

Years later, he came back stronger, and finally got his revenge. He landed the trick, earned the cover of Thrasher Magazine, and his kids got to watch him make history.

This coin, **$CJET**, is a tribute to that moment and to the biggest 360 flip ever landed.

The goal is simple: help skateboarders discover cryptocurrency, have fun, and maybe build a community along the way.

**$CJET** was created by **[Shrimpdaddy](https://www.instagram.com/shrimpdaddy/)**, a skateboarder and content creator. He is holding his bag and is not selling.

Good luck to everyone who gets involved.
`,
    typingEffect: false,
    className: "prose prose-lg dark:prose-invert mb-8 text-left text-white",
    titleClassName: "text-2xl font-extrabold text-white mb-4 font-extrabold",
  },
  // Add more sections here as needed, e.g.:
   {
  title: "Chris Joslin's Wallet",
  content: `Show respect to the man who made history. Any $CJET or SOL sent here is reserved for Chris — he can claim it anytime.`,
  typingEffect: false,
  className: "prose prose-base dark:prose-invert mb-4 text-left text-white text-sm animate-fade-up animate-duration-1000 animate-delay-100 animate-ease-in-out",
  titleClassName: "text-xl font-extrabold text-white mb-2 font-bold animate-fade-up animate-duration-1000 animate-delay-150 animate-ease-in-out",
  wallet: "GRwHtU38sX4VWJZVkxgGJDHzj7n8brUU67QqsmC5i6Sz",
  walletTitle: "Give to Chris Joslin"
   },
   {
  title: "Boards for Kids' Wallet",
  content: `This wallet funds skateboards for kids who can’t afford them. Once we pick the nonprofit partner, 100% of funds will go toward getting boards into kids’ hands.`,
  typingEffect: false,
  className: "prose prose-base dark:prose-invert mb-4 text-left text-white text-sm animate-fade-up animate-duration-1000 animate-delay-300 animate-ease-in-out",
  titleClassName: "text-xl font-extrabold text-white mb-2 animate-fade-up animate-duration-1000 animate-delay-350 animate-ease-in-out",
  wallet: "6JeAXQaHoL7wXA1bXgE55MfYzWYKaLF2uGBBzVUuWBeo",
  walletTitle: "Give to Boards for Kids"
   },
   {
  title: "Build Skateparks' Wallet",
  content: `Help build and fix skateparks around the world. This wallet will go to a nonprofit partner focused on creating more places to skate.`,
  typingEffect: false,
  className: "prose prose-base dark:prose-invert mb-4 text-left text-white text-sm animate-fade-up animate-duration-1000 animate-delay-400 animate-ease-in-out",
  titleClassName: "text-xl font-extrabold text-white mb-2 animate-fade-up animate-duration-1000 animate-delay-450 animate-ease-in-out",
  wallet: "67AdEZJUYuufx45WwUDgjEC9TVNeYniMRPnHf7PfDtAC",
  walletTitle: "Give to Build Skateparks"
   },
   {
  title: "Skateboard Injury Relief's Wallet",
  content: `Help build and fix skateparks around the world. This wallet will go to a nonprofit partner focused on creating more places to skate.`,
  typingEffect: false,
  className: "prose prose-base dark:prose-invert mb-4 text-left text-white text-sm animate-fade-up animate-duration-1000 animate-delay-500 animate-ease-in-out",
  titleClassName: "text-xl font-extrabold text-white mb-2 animate-fade-up animate-duration-1000 animate-delay-550 animate-ease-in-out",
  wallet: "DPxn8bBm7nmXNHEjW8EWisUjJwb5M9A33QG33riiPZNo",
  walletTitle: "Give to Skateboard Injury Relief"
   },
];

export function MarkdownBlock({ title, markdown, typingEffect, className, showTitle = false, titleClassName, titleTag = 'p', wallet, walletTitle, walletTitleClassName, showWalletButton = true }: {
  title?: string;
  markdown: string;
  typingEffect: boolean;
  className?: string;
  showTitle?: boolean;
  titleClassName?: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  wallet?: string;
  walletTitle?: string;
  walletTitleClassName?: string;
  showWalletButton?: boolean;
}) {
  const [rawHtml, setRawHtml] = useState("");
  const [visibleHtml, setVisibleHtml] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [coinAmount, setCoinAmount] = useState<number | null>(null);
  const [coinPrice, setCoinPrice] = useState<number | null>(null);

  useEffect(() => {
    const parseMarkdown = async () => {
      const result = await Promise.resolve(marked(markdown.trim()));
      const processed = result.replace(
        /<p>/g,
        '<p class="my-custom-class prose-lg text-left dark:prose-invert mb-4">'
      );
      setRawHtml(processed);
    };
    parseMarkdown();

    // Detect mobile (screen < 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [markdown]);

  useEffect(() => {
    if (!typingEffect || isMobile) {
      setVisibleHtml(rawHtml);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      const partial = rawHtml.slice(0, i);
      const openTag = partial.lastIndexOf("<");
      const closeTag = partial.lastIndexOf(">");
      if (openTag === -1 || openTag < closeTag) {
        setVisibleHtml(partial);
      }
      if (i >= rawHtml.length) clearInterval(timer);
    }, 6);
    return () => clearInterval(timer);
  }, [rawHtml, typingEffect, isMobile]);

  // Fetch wallet coin amount if wallet address is provided
  useEffect(() => {
    if (!wallet) return;
    fetchWalletCoinAmounts([wallet]).then((amounts) => {
      const amount = amounts[wallet];
      if (typeof amount === "number" && amount > 0) setCoinAmount(amount);
      else setCoinAmount(null);
    });
  }, [wallet]);

  // Fetch CJET price once
  useEffect(() => {
    fetchCJETPrice().then((price) => {
      if (typeof price === "number" && price > 0) setCoinPrice(price);
      else setCoinPrice(null);
    });
  }, []);

  return (
    <>
      {/* Wallet section layout: H2 walletTitle, H3 balance, P content, H4 walletTitle, clipboard button */}
      {wallet && walletTitle && (
        <h2 className={walletTitleClassName ?? "text-2xl font-extrabold text-white mb-2"}>{walletTitle}</h2>
      )}
      {wallet && coinPrice !== null && coinPrice > 0 && (
        <h3 className="text-lg font-semibold text-green-400 mb-2">
          {coinAmount !== null && coinAmount > 0
            ? `${coinAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} $CJET`
            : '0 $CJET'}
          <span className="ml-2 text-base text-white">(
            {coinAmount !== null
              ? (coinAmount * coinPrice >= 1
                  ? `$${(coinAmount * coinPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`
                  : `$${(coinAmount * coinPrice).toLocaleString(undefined, { maximumFractionDigits: 6 })} USD`)
              : '$0 USD'}
          )</span>
        </h3>
      )}
      {/* Content paragraph */}
      <div className={className} dangerouslySetInnerHTML={{ __html: visibleHtml }} />
      {/* Removed H4 walletTitle and clipboard button from MarkdownBlock. Render these in parent if needed. */}
    </>
  );
}

// Named export for single section rendering
export function Text({ title, showTitle = false, titleClassName, titleTag = 'p', walletTitle, walletTitleClassName, showWalletButton = true }: {
  title: string;
  showTitle?: boolean;
  titleClassName?: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  walletTitle?: string;
  walletTitleClassName?: string;
  showWalletButton?: boolean;
}) {
  const section = markdownSections.find(s => s.title === title);
  if (!section) return null;
  return (
    <MarkdownBlock
      title={section.title}
      markdown={section.content}
      typingEffect={section.typingEffect}
      className={section.className}
      showTitle={showTitle}
      titleClassName={titleClassName ?? section.titleClassName}
      titleTag={titleTag}
      wallet={section.wallet}
      walletTitle={walletTitle ?? section.walletTitle}
      walletTitleClassName={walletTitleClassName}
      showWalletButton={showWalletButton}
    />
  );
}

// Helper to get wallet address by title
export function getWalletAddress(title: string): string | undefined {
  const section = markdownSections.find(s => s.title === title);
  return section?.wallet;
}

export { markdownSections };
