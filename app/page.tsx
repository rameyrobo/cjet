import { Metadata } from "next"
import { Bowlby_One_SC } from "next/font/google"

const bowlby = Bowlby_One_SC({ subsets: ["latin"], weight: "400" });
import CjetCard from "components/CjetCard/CjetCard";
import MediaCarousel from "components/MediaCarousel/MediaCarousel";
import { Text } from "components/SiteText/MarkdownText";
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
    <main className="min-h-screen bg-gray-900 flex items-center justify-center overflow-x-hidden pb-16">
      <div className="w-full max-w-full grid grid-cols-1 max-h-dvh mt-12 lg:mt-0 lg:grid-cols-8 gap-0 lg:gap-8 items-start py-6">
        <div className="flex flex-col items-center justify-center lg:mt-16 xl:mt-0 lg:justify-start xl:justify-center lg:h-full px-4 xl:px-6 col-span-3 lg:col-span-2">
          <h1 className={`h1Size font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-up animate-duration-1000 animate-delay-400 animate-ease-in-out ${bowlby.className} italic!`}>$CJET</h1>
          <CjetCard />
          <div className="mt-8 w-full max-w-sm lg:ml-0">
            <div className="hidden lg:block">
            <Song />
            </div>
          </div>
        </div>
        <div className="flex items-start xl:items-center justify-start px-9 lg:px-4 col-span-3 relative h-full">
          {/* Media carousel on the right */}
          <div className="max-h-dvh">
            <div className="flex flex-col items-start justify-start px-4 overflow-scroll lg:hidden animate-fade-up animate-duration-1000 animate-delay-400 animate-ease-in-out">
                <Text title="Project Description" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <Text title="Chris Joslin's Wallet:" showTitle={true} />
                  </div>
                  <div className="col-span-1">
                    <Text title="Boards for Kids' Wallet:" showTitle={true} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="col-span-1">
                    <Text title="Build Skateparks' Wallet:" showTitle={true} />
                  </div>
                  <div className="col-span-1">  
                    <Text title="Skateboard Injury Relief's Wallet:" showTitle={true} />
                  </div>
                </div>
            </div>
            <MediaCarousel />
          </div>
        </div>
        <div className="items-center justify-start mt-14 lg:justify-center px-8 lg:pt-7 lg:pt-0 col-span-3 relative h-full hidden lg:flex">
          <div className="h-full">
            <Text title="Project Description" />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="col-span-1">
                <Text title="Chris Joslin's Wallet:" showTitle={true} />
              </div>
                <div className="col-span-1">
                <Text title="Boards for Kids' Wallet:" showTitle={true} />
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                <div className="col-span-1">
                <Text title="Build Skateparks' Wallet:" showTitle={true} />
              </div>
                <div className="col-span-1">  
                <Text title="Skateboard Injury Relief's Wallet:" showTitle={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}