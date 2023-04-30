import Image from "next/image";
import logo from "@/public/Icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGroup,
  faEnvelope,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Home from "@/public/icons/Home.png";
import Users from "@/public/icons/Users.png";
import Message from "@/public/icons/Message.png";
import Settings from "@/public/icons/Settings.png";

export default function Header() {
  return <><div className="w-[5.5rem] h-full bg-white border-r-2 border-gray-300 space-y-10">
      <div className="flex items-center justify-center py-2">
      <Image src={logo} alt="logo" className="w-16" />
      </div>
      <div className="flex flex-col items-center space-y-10">
      <Image src={Home} alt="Home" className="w-5" />
      <Image src={Users} alt="Users" className="w-5" />
      <Image src={Message} alt="Message" className="w-5" />
      <Image src={Settings} alt="Settings" className="w-5" />
      </div>
    </div></>;
}