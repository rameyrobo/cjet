"use client";

export default function PurchaseButtons() {
  return (
    <div className="flex flex-wrap justify-end gap-3 absolute top-4 right-9 z-50 max-w-1/2 sm:max-w-full">
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
