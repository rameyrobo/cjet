"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { iconLibrary } from "../../resources/icons";

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
    poster: "/assets/cheers-poster.jpg",
  }, 
  {
    type: "video",
    src: "/assets/private-jet.mp4",
    alt: "Joslin in a private jet",
    poster: "/assets/private-jet-poster.jpg",
  }, 
  {
    type: "video",
    src: "/assets/music_video.mp4",
    alt: "Chris Joslin's music video",
    poster: "/assets/music_video-poster.jpg",
  }, 
  {
    type: "video",
    src: "/assets/limo.mp4",
    alt: "Chris Joslin in a limo",
    poster: "/assets/limo-poster.jpg",
  },
];

export default function MediaCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [iosUnmuteReady, setIosUnmuteReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = media[index];

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
  }, [index, paused, current]);

  // iOS detection
  const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

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

  // For iOS, only allow unmuting after direct tap on video
  const handleVideoTap = () => {
    if (isIOS && isMuted) {
      setIosUnmuteReady(true);
      setIsMuted(false);
    }
  };

  // Universal mute/unmute button
  const handleMuteToggle = () => {
    if (isIOS && !iosUnmuteReady) return; // Block unmute until tap
    setIsMuted((m) => !m);
  };

  return (
    <div className="h-auto w-full flex items-start justify-center relative pb-20 lg:pb-0 mt-2 lg:mt-32">
      {/* Left arrow */}
      <button
        onClick={goLeft}
        type="button"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white rounded-full w-10 h-10 flex align-self-center items-center justify-center hover:bg-black/70 cursor-pointer"
        aria-label="Previous"
      >
        &#60;
      </button>
      {/* Media */}
      <div className="w-full flex items-start mt-12 lg:mt-0 justify-center animate-duration-500 animate-delay-200 animate-ease-in-out">
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
          <div className="relative w-full flex flex-col items-center">
            {/* Speaker icon button */}
            <button
              type="button"
              onClick={handleMuteToggle}
              className="absolute top-2 left-2 z-20 text-2xl bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80"
              aria-label={isMuted ? "Unmute" : "Mute"}
              disabled={isIOS && !iosUnmuteReady}
            >
              {isMuted
                ? iconLibrary.speakeroff && <span aria-hidden="true"><iconLibrary.speakeroff size={24} /></span>
                : iconLibrary.speakeron && <span aria-hidden="true"><iconLibrary.speakeron size={24} /></span>
              }
            </button>
            <video
              key={current.src}
              ref={videoRef}
              height={current.height}
              width={current.width}
              src={current.src}
              poster={current.poster}
              autoPlay
              loop={false}
              muted={isMuted}
              playsInline
              controls={false}
              className="object-contain rounded-2xl max-h-[100vh] w-lvw animate-fade animate-duration-500 animate-delay-0 animate-ease-in-out"
              onEnded={handleVideoEnd}
              onClick={handleVideoTap}
            />
          </div>
        )}
      </div>
      {/* Right arrow */}
      <button
        onClick={goRight}
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 cursor-pointer"
        aria-label="Next"
      >
        &#62;
      </button>
    </div>
  );
}
