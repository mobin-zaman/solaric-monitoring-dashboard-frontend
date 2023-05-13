import Image from "next/image";
import logo from "@/public/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { authentication } from "@/config/firebase";
import { useRouter } from "next/router";


export default function LogIn() {

  const router = useRouter();

  if (typeof window !== "undefined" && localStorage.getItem("Token") !== null) {
    router.push("/user");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPassNotMatch, setEmailPassNotMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      localStorage.setItem("Token", response.user.accessToken);

      setInterval(async () => {
        const refreshedToken = await auth.currentUser.getIdToken(true);
        localStorage.setItem("Token", refreshedToken);
        console.log("Token refreshed");
      }, 55 * 60 * 1000);

      router.push("/user");
      setEmailPassNotMatch(false);
    } catch (error) {
      setEmailPassNotMatch(true);
      setEmail("");
      setPassword("");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /></div>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Password</div>
            <div className="flex items-center border-b-2 border-[#168636]"><FontAwesomeIcon icon={faLock} />
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                    <button
          className="bg-transparent focus:outline-none"
          onClick={handleShowPassword}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="text-[#373737] hover:text-[#168636] ml-2"
          />
        </button>
            </div>
          </div>
          <div className="flex items-center justify-end text-[#373737] font-medium text-sm py-3 space-x-1">
            {/* <div className="space-x-1 flex items-center">
              <input type="checkbox" className="w-4 h-4 border border-pink-950" />
              <span className="text-[#373737] font-medium text-sm">
                Remember me
              </span>
            </div> */}
            <button className="text-[#373737] font-medium text-sm">
              Forgot password?
            </button>
          </div>
          {emailPassNotMatch &&           <div className="flex items-center justify-center py-3 space-x-1">
            <span className="text-[#ff0e0e] font-medium text-sm">
              Email & Password not match.
            </span>
            </div> }
        </div>
        <div className="flex items-center justify-end">
            <button className="w-32 h-11 text-xl text-white font-semibold bg-[#39B54A] rounded-md" onClick={handleSignUp}>
            Sign In
            </button>
          </div>
      </div>
    </div>
  );
}
