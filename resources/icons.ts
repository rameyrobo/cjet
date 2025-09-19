import { IconType } from "react-icons";

import { 
  FaTelegramPlane,
  FaInstagram,
 } from "react-icons/fa";

import { 
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark, 
} from "react-icons/hi2";


import { 
    FaSquareXTwitter,
} from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  speakeron: HiMiniSpeakerWave,
  speakeroff: HiMiniSpeakerXMark,
  instagram: FaInstagram,
  telegram: FaTelegramPlane,
  twitter: FaSquareXTwitter,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
