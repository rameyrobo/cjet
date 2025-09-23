import { IconType } from "react-icons";

import { 
  FaTelegramPlane,
  FaInstagram,
 } from "react-icons/fa";

import { 
  HiOutlineClipboardCopy,
} 
from "react-icons/hi";

import { 
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark, 
} from "react-icons/hi2";


import { 
    FaSquareXTwitter,
} from "react-icons/fa6";

import { 
  RxOpenInNewWindow, 
} from "react-icons/rx";


export const iconLibrary: Record<string, IconType> = {
  clipboard: HiOutlineClipboardCopy,
  instagram: FaInstagram,
  openinnewwindow: RxOpenInNewWindow,
  speakeron: HiMiniSpeakerWave,
  speakeroff: HiMiniSpeakerXMark,
  telegram: FaTelegramPlane,
  twitter: FaSquareXTwitter,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
