import { Metadata } from "next"
import { Bowlby_One_SC } from "next/font/google"

const bowlby = Bowlby_One_SC({ subsets: ["latin"], weight: "400" });
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
      <div className="w-full max-w-full grid grid-cols-1 max-h-dvh mt-12 lg:mt-0 lg:grid-cols-7 gap-0 lg:gap-8 items-start py-6">
        <div className="flex flex-col items-center justify-center lg:justify-center lg:h-full px-4 col-span-3 lg:col-span-2">
          <h1 className={`h1Size font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-up animate-duration-1000 animate-delay-400 animate-ease-in-out ${bowlby.className} italic!`}>$CJET</h1>
          
          <CjetCard />
          <div className="mt-8 w-full max-w-sm lg:ml-0">
            <div className="hidden lg:block">
            <Song />
            </div>
          </div>
        </div>
        <div className="flex items-start lg:items-center justify-start px-9 lg:px-4 col-span-3 relative h-full">
          {/* Media carousel on the right */}
          <div className="max-h-dvh">
            <div className="block lg:hidden">
            <MarkdownSection />
            </div>
            <MediaCarousel />
          </div>
        </div>
        <div className="items-center justify-start lg:justify-center px-8 lg:pt-7 lg:pt-0 col-span-2 relative h-full hidden lg:flex">
          <div className="h-dvh">
            <MarkdownSection />
          </div>
        </div>
      </div>
    </main>
  )
}