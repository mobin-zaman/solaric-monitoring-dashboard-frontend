import Image from "next/image";
import logo from "@/public/Icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGroup,
  faEnvelope,
  faGear,
  faDiagramProject,
} from "@fortawesome/free-solid-svg-icons";
import Home from "@/public/icons/Home.png";
import Users from "@/public/icons/Users.png";
import Projects from "@/public/icons/Projects.png";
import Message from "@/public/icons/Message.png";
import Settings from "@/public/icons/Settings.png";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/Helper";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
  const { data } = useQuery("currentUser", getCurrentUser);

  const link = useRouter().pathname;

  return (
    <>
      <div className="w-[5.5rem] h-full bg-white border-r-2 border-gray-300 space-y-10 text-[#25476A] font-semibold">
        <div className="flex items-center justify-center py-2">
          <Image src={logo} alt="logo" className="w-16" />
        </div>
        <div className="flex flex-col items-center space-y-10">
          {/* <Image src={Home} alt="Home" className="w-5" /> */}
          <FontAwesomeIcon icon={faHouse} className="w-5 h-5" />
          {data?.role === "ADMIN" && (
            <Link href="/users">
              {/* <Image src={Users} alt="Users" className="w-5" /> */}
              <FontAwesomeIcon
                icon={faUserGroup}
                className={`w-5 h-5 ${
                  link === "/users" ? "text-[#38EB1A]" : ""
                }`}
                title="Users"
              />
            </Link>
          )}
          {data?.role === "ADMIN" && (
            <Link href="/project">
              {/* <Image src={Projects} alt="Projects" className="w-6" /> */}
              <FontAwesomeIcon
                icon={faDiagramProject}
                className={`w-5 h-5 ${
                  link === "/project"
                    ? "text-[#38EB1A]"
                    : link === "/project/[projectId]"
                    ? "text-[#38EB1A]"
                    : ""
                }`}
                title="Projects"
              />
            </Link>
          )}
          {/* <Image src={Message} alt="Message" className="w-5" /> */}
          <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
          {/* <Image src={Settings} alt="Settings" className="w-5" /> */}
          <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}
