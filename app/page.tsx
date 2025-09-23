import { Metadata } from "next"
import { Bowlby_One_SC } from "next/font/google"

const bowlby = Bowlby_One_SC({ subsets: ["latin"], weight: "400" });
import CjetCard from "components/CjetCard/CjetCard";
import MediaCarousel from "components/MediaCarousel/MediaCarousel";
import PurchaseButtons from "components/Purchase/Buttons";
import { Text } from "components/SiteText/MarkdownText";
import SocialMediaButtons from "components/SocialMedia/Buttons";
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
    <main className="min-h-screen bg-gray-900 flex items-center justify-center overflow-x-hidden pb-16 relative">
        <SocialMediaButtons />
        <PurchaseButtons />
      <div className="w-full max-w-[1900px] grid grid-cols-1 max-h-dvh mt-32 lg:mt-0 lg:grid-cols-8 gap-0 lg:gap-8 items-start py-6">
        <div className="flex flex-col items-center justify-center lg:mt-16 xl:mt-20 lg:justify-start lg:h-full px-9 lg:px-6 col-span-3 lg:col-span-2">
          <h1 className={`h1Size font-extrabold text-gray-900 dark:text-white mb-6 lg:mb-0.5 animate-fade-up animate-duration-1000 animate-delay-400 animate-ease-in-out ${bowlby.className} italic!`}>$CJET</h1>
          <Text title="Mission Statement" />
          <CjetCard />
        </div>
        <div className="flex items-start xl:items-start justify-start px-9 lg:px-4 col-span-2 relative h-full">
          <div className="max-h-dvh">
            <div className="flex flex-col items-start justify-start px-4 overflow-scroll lg:hidden animate-fade-up animate-duration-1000 animate-delay-400 animate-ease-in-out">
                <Text title="Project Description" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="col-span-1 hover:scale-[1.05] transition-all duration-300">
                    <Text title="Chris Joslin's Wallet:" showTitle={true} />
                  </div>
                  <div className="col-span-1 hover:scale-[1.05] transition-all duration-300" >
                    <Text title="Boards for Kids' Wallet:" showTitle={true} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                  <div className="col-span-1 hover:scale-[1.05] transition-all duration-300">
                    <Text title="Build Skateparks' Wallet:" showTitle={true} />
                  </div>
                  <div className="col-span-1 hover:scale-[1.05] transition-all duration-300">  
                    <Text title="Skateboard Injury Relief's Wallet:" showTitle={true} />
                  </div>
                </div>
            </div>
            <MediaCarousel />
            <Song />
          </div>
        </div>
        <div className="items-center justify-start mt-16 lg:justify-center px-8 lg:pt-7 lg:pt-0 col-span-4 relative h-full hidden lg:flex">
          <div className="h-full">
            <Text title="Project Description" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="col-span-1 hover:scale-[1.05] transition-all duration-300">
                <Text title="Chris Joslin's Wallet:" showTitle={true} />
              </div>
                <div className="col-span-1 hover:scale-[1.05] transition-all duration-300">
                <Text title="Boards for Kids' Wallet:" showTitle={true} />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="col-span-1 hover:scale-[1.05] transition-all duration-300">
                <Text title="Build Skateparks' Wallet:" showTitle={true} />
              </div>
                <div className="col-span-1 hover:scale-[1.05] transition-all duration-300">  
                <Text title="Skateboard Injury Relief's Wallet:" showTitle={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}