import { Metadata } from "next"
import CjetCard from "components/CjetCard/CjetCard";
import MarkdownSection from "components/MarkdownSection/MarkdownSection";
import MediaCarousel from "components/MediaCarousel/MediaCarousel";
import Song from "components/Song/Song";


export const metadata: Metadata = {
  title: "$CJET - Mark Joslin's 360 flip over El Toro",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    
  },
}

export default function Web() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-full grid grid-cols-1 max-h-dvh md:grid-cols-7 gap-0 md:gap-8 items-start py-6">
        <div className="flex flex-col items-center justify-center md:justify-center md:h-full px-4 col-span-3 md:col-span-2">
          <h1 className="h1Size font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-up animate-duration-1000 animate-delay-400 animate-ease-in-out">$CJET</h1>
          
          <CjetCard />
          <div className="mt-8 w-full max-w-sm md:ml-0">
            <div className="hidden md:block">
            <Song />
            </div>
          </div>
        </div>
        <div className="flex items-start md:items-center justify-start px-9 md:px-4 col-span-3 relative h-full">
          {/* Media carousel on the right */}
          <div className="max-h-dvh">
            <div className="block md:hidden">
            <MarkdownSection />
            </div>
            <MediaCarousel />
          </div>
        </div>
        <div className="items-center justify-start lg:justify-center px-8 md:pt-7 lg:pt-0 col-span-2 relative h-full hidden md:flex">
          <div className="h-dvh">
            <MarkdownSection />
          </div>
        </div>
      </div>
    </main>
  )
}