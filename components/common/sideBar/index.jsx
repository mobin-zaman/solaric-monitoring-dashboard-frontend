import Image from "next/image";
import logo from "@/public/Icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faEnvelope,
  faGear,
  faCalculator,
  faCubesStacked,
  faMicrochip,
  faFileArrowUp,
  faFileArrowDown,
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
      <div className="w-[6rem] h-full bg-white border-r-2 border-gray-300 space-y-10 text-gray-700 font-semibold pt-32">
        {/* <div className="flex items-center justify-center py-2">
          <Image src={logo} alt="logo" className="w-16" />
        </div> */}
        <div className="flex flex-col items-center space-y-10">
          {/* <Image src={Home} alt="Home" className="w-5" /> */}
          <Link href="/dashboard">
            <FontAwesomeIcon
              icon={faHouse}
              className={`w-[1.3rem] h-[1.3rem] ${
                link === "/dashboard" ? "text-green-700" : ""
              }`}
              title="Dashboard"
            />
          </Link>
          {data?.role === "ADMIN" && (
            <Link href="/users">
              {/* <Image src={Users} alt="Users" className="w-5" /> */}
              <FontAwesomeIcon
                icon={faUsers}
                className={`w-[1.3rem] h-[1.3rem] ${
                  link === "/users" ? "text-green-700" : ""
                }`}
                title="Users"
              />
            </Link>
          )}
          {data?.role === "ADMIN" && (
            <Link href="/projects">
              {/* <Image src={Projects} alt="Projects" className="w-6" /> */}
              <FontAwesomeIcon
                icon={faCubesStacked}
                className={`w-[1.3rem] h-[1.3rem] ${
                  link === "/projects"
                    ? "text-green-700"
                    : link === "/projects/[projectId]"
                    ? "text-green-700"
                    : ""
                }`}
                title="Projects"
              />
            </Link>
          )}
          {data?.role === "ADMIN" && (
            <Link href="/inverters">
              <FontAwesomeIcon
                icon={faMicrochip}
                className={`w-[1.3rem] h-[1.3rem] ${
                  link === "/inverters"
                    ? "text-green-700"
                    : link === "/inverters/[inverterId]"
                    ? "text-green-700"
                    : ""
                }`}
                title="Inverters"
              />
            </Link>
          )}
          {data?.role === "ADMIN" && (
            <Link href="/meters">
              <FontAwesomeIcon
                icon={faCalculator}
                className={`w-[1.3rem] h-[1.3rem] ${
                  link === "/meters"
                    ? "text-green-700"
                    : link === "/meters/[meterId]"
                    ? "text-green-700"
                    : ""
                }`}
                title="Meters"
              />
            </Link>
          )}
          {data?.role === "ADMIN" && (
            <Link href="/import">
              <FontAwesomeIcon
                icon={faFileArrowUp}
                className={`w-[1.3rem] h-[1.3rem] ${
                  link === "/import" ? "text-green-700" : ""
                }`}
                title="Import"
              />
            </Link>
          )}
          {data?.role === "ADMIN" && (
            <Link href="/export">
              <FontAwesomeIcon
                icon={faFileArrowDown}
                className={`w-[1.3rem] h-[1.3rem] ${
                  link === "/export" ? "text-green-700" : ""
                }`}
                title="Export"
              />
            </Link>
          )}
          {/* <Image src={Message} alt="Message" className="w-5" /> */}
          {/* <FontAwesomeIcon icon={faEnvelope} className="w-[1.3rem] h-[1.3rem]" /> */}
          {/* <Image src={Settings} alt="Settings" className="w-5" /> */}
          {/* <FontAwesomeIcon icon={faGear} className="w-[1.3rem] h-[1.3rem]" /> */}
        </div>
      </div>
    </>
  );
}
