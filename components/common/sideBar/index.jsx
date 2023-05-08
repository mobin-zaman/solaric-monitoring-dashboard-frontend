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
import Projects from "@/public/icons/Projects.png";
import Message from "@/public/icons/Message.png";
import Settings from "@/public/icons/Settings.png";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/Helper";
import Link from "next/link";

export default function SideBar() {
  const { data } = useQuery("currentUser", getCurrentUser);

  return (
    <>
      <div className="w-[5.5rem] h-full bg-white border-r-2 border-gray-300 space-y-10">
        <div className="flex items-center justify-center py-2">
          <Image src={logo} alt="logo" className="w-16" />
        </div>
        <div className="flex flex-col items-center space-y-10">
          <Image src={Home} alt="Home" className="w-5" />
          {data?.role === "ADMIN" && (
            <Image src={Users} alt="Users" className="w-5" />
          )}
          {data?.role === "ADMIN" && (
            <Link href="/projects">
              <Image src={Projects} alt="Projects" className="w-6" />
            </Link>
          )}
          <Image src={Message} alt="Message" className="w-5" />
          <Image src={Settings} alt="Settings" className="w-5" />
        </div>
      </div>
    </>
  );
}
