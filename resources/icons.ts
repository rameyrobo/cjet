import { IconType } from "react-icons";

import { 
  FaTelegramPlane,
  FaInstagram,
 } from "react-icons/fa";

import { 
    FaSquareXTwitter,
} from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  instagram: FaInstagram,
  telegram: FaTelegramPlane,
  twitter: FaSquareXTwitter,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
