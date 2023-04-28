import Image from "next/image";
import logInPageBg from "@/public/logInPageBg.png";
import logo from "@/public/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

export default function LogIn() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[url('/logInPageBg.png')] bg-cover bg-center select-none">
      <div className="flex flex-col justify-between w-[20rem] h-[30rem] sm:w-[26rem] sm:h-[34rem] bg-[#D9D9D9] rounded-md bg-opacity-60 p-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <div className="w-48 h-16 sm:w-56 sm:h-20">
              <Image src={logo} alt="logo" />
            </div>
          </div>
          <div className="flex items-center justify-start py-4">
            <span className="text-[#373737] font-medium text-2xl">Sign In</span>
          </div>
          <div className="flex items-center justify-start text-[#373737] font-medium text-sm py-3 space-x-1">
            <span className="text-[#373737] font-medium text-sm">
              New user?
            </span>
            <button className="text-[#F7100C] font-medium text-sm">
              Create an account
            </button>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Email address</div>
            <div className="flex items-center border-b-2 border-[#168636]"><FontAwesomeIcon icon={faEnvelope} />
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter your email"
            /></div>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Password</div>
            <div className="flex items-center border-b-2 border-[#168636]"><FontAwesomeIcon icon={faLock} />
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="password"
              placeholder="Enter your password"
            /></div>
          </div>
          <div className="flex items-center justify-between text-[#373737] font-medium text-sm py-3 space-x-1">
            <div className="space-x-1 flex items-center">
              <input type="checkbox" className="w-4 h-4 border border-pink-950" />
              <span className="text-[#373737] font-medium text-sm">
                Remember me
              </span>
            </div>
            <button className="text-[#373737] font-medium text-sm">
              Forgot password?
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end">
            <button className="w-32 h-11 mt-5 text-xl text-white font-semibold bg-[#39B54A] rounded-md">
            Sign In
            </button>
          </div>
      </div>
    </div>
  );
}
