import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/Helper";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";
import Notification from "@/public/icons/Notification.png";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/Helper";
import { useRouter } from "next/router";

export default function Header() {
  const link = useRouter().pathname;
  const { data } = useQuery("currentUser", getCurrentUser);
  const [projectImageUrl, setProjectImageUrl] = useState();
  const [projectDefaultImageUrl, setProjectDefaultImageUrl] = useState(localStorage.getItem("projectDefaultImageUrl"));

  useEffect(() => {
    if(link === "/dashboard") {
    setInterval(() => {

    setProjectImageUrl(localStorage.getItem("projectImageUrl"));
    }, 1);
  } else {
    setProjectImageUrl(projectDefaultImageUrl);
  }

  }, [projectDefaultImageUrl, link]);

  const handleSignOut = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("TokenExpiration");
    window.location.href = "/";
  };

  const [base64ImageData, setBase64ImageData] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result.split(',')[1]; // Extract base64 portion
        setBase64ImageData(e.target.result);
  
        try {
          const response = await uploadImage(base64Data);
          console.log('Uploaded image data:', response);
          // Do something with the uploaded image data, such as displaying it or further processing
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-full h-16 bg-white flex justify-between space-x-6 items-center px-5 border-b-2 border-gray-300 text-[#25476A] font-semibold tracking-wide">
        <h1 className="text-[#39B54A] font-semibold text-md flex space-x-2 items-center justify-center">
          <FontAwesomeIcon icon={faBuilding} />
          <span className="text-sm ">{data?.companyName.toUpperCase()}</span>
          {/* TODO*/}
          {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
        </h1>
        <Image src={projectImageUrl} alt="logo" width={200} height={200} className="w-24 h-14" />
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <span className="text-sm">{data?.name}</span>
              <span className="text-xs">{data?.email}</span>
            </div>
            <div className="relative">
              <div className="absolute top-7 left-0 w-3 h-3 bg-[#38EB1A] rounded-full"></div>
              <Image
                src={placeholderImage}
                alt="logo"
                className="w-10 rounded-full border-2 border-[#25476A]"
              />
            </div>
          </div>
          <div className="flex justify-center items-center space-x-6">
            {/* <div className="relative">
            <div className="absolute -top-1 left-2 w-2 h-2 bg-[#38EB1A] rounded-full"></div>
            <Image src={Notification} alt="Settings" className="w-4" />
          </div> */}
            <button
              onClick={handleSignOut}
              className="text-[#25476A] rounded-md text-lg flex items-center"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              {/* <span>Sign Out</span> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
