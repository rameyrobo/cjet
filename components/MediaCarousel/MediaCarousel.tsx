"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const media = [
  {
    type: "image",
    src: "/assets/cjet.png",
    alt: "$CJET logo",
    width: 2000,
    height: 2000,
  },
  {
    type: "image",
    src: "/assets/joslin-family.png",
    alt: "Chris Joslin with his kids",
    width: 1489,
    height: 1900,
  },
  {
    type: "image",
    src: "/assets/thrasher-cover.png",
    alt: "Chris Joslin 360 flip down El Toro Thrasher cover",
    width: 1402,
    height: 1768,
  },
  {
    type: "video",
    src: "/assets/cheers.mp4",
    alt: "Joslin cheers to you",
    width: 1080,
    height: 1890,
  }, 
  {
    type: "video",
    src: "/assets/private-jet.mp4",
    alt: "Joslin in a private jet",
  }, 
  {
    type: "video",
    src: "/assets/music_video.mp4",
    alt: "Chris Joslin's music video",
  }, 
  {
    type: "video",
    src: "/assets/limo.mp4",
    alt: "Chris Joslin in a limo",
  },
];

export default function MediaCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!current || paused) return;
    let timer: NodeJS.Timeout | null = null;
    if (current.type === "image") {
      timer = setInterval(() => {
        setIndex((i) => (i + 1) % media.length);
      }, 3500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [index, paused]);

  const current = media[index];

  if (!current) return null;

  const handleVideoEnd = () => {
    setIndex((i) => (i + 1) % media.length);
  };

  const goLeft = () => {
    setPaused(true);
    setIndex((i) => (i - 1 + media.length) % media.length);
  };
  const goRight = () => {
    setPaused(true);
    setIndex((i) => (i + 1) % media.length);
  };

  return (
    <div className="h-full md:h-dvh w-full flex items-center justify-center relative">
      {/* Left arrow */}
      <button
        onClick={goLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white rounded-full w-10 h-10 flex items-start md:items-center justify-center hover:bg-black/70 cursor-pointer"
        aria-label="Previous"
      >
        &#60;
      </button>
      {/* Media */}
      <div className="w-full flex items-start justify-center animate-duration-500 animate-delay-200 animate-ease-in-out">
        {current.type === "image" ? (
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="object-contain rounded-2xl animate-fade animate-duration-500 animate-delay-200 animate-ease-in-out"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <video
            key={current.src}
            height={current.height}
            width={current.width}
            src={current.src}
            controls
            autoPlay
            loop={false}
            muted
            className="object-contain rounded-2xl max-h-[100vh] w-lvw animate-duration-500 animate-delay-200 animate-ease-in-out"
            onEnded={handleVideoEnd}
          />
        )}
      </div>
      {/* Right arrow */}
      <button
        onClick={goRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 cursor-pointer"
        aria-label="Next"
      >
        &#62;
      </button>
    </div>
  );
}
