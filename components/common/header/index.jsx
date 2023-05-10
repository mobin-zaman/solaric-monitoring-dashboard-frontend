import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/Helper";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";
import Notification from "@/public/icons/Notification.png";

export default function Header() {


  const { data } = useQuery("currentUser", getCurrentUser);

  const handleSignOut = () => {
    localStorage.removeItem("Token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="w-full h-16 bg-white flex justify-end items-center px-5 border-b-2 border-gray-300">
        {/* <h1 className="text-[#39B54A] font-semibold text-md">
          Monitoring DashBoard
        </h1> */}
        <div className="flex justify-center items-center space-x-3.5">
          <button onClick={handleSignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          <div className="relative">
            <div className="absolute -top-1 left-2 w-2 h-2 bg-[#38EB1A] rounded-full"></div>
            <Image src={Notification} alt="Settings" className="w-4" />
          </div>
          <span>{data?.name}</span>
          <div className="relative">
            <div className="absolute top-7 left-0 w-3 h-3 bg-[#38EB1A] rounded-full"></div>
            <Image
              src={placeholderImage}
              alt="logo"
              className="w-10 rounded-full border border-[#373737]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
