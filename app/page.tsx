import { Metadata } from "next"
import CjetCard from "components/CjetCard/CjetCard";
import Song from "components/Song/Song";

export const metadata: Metadata = {
  title: "CJET",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    
  },
}

export default function Web() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="mx-4 max-w-2xl text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white">$CJET</h1>
        <CjetCard />
        <Song />
      </div>
    </main>
    </>
  )
}