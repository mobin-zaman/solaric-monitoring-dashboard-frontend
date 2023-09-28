import Header from "@/components/common/header";
import Dashboard1 from "@/components/dashboard";
import SideBar from "@/components/common/sideBar";
import useFirebaseToken from "@/hooks/useFirebaseToken";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import Image from "next/image";

export default function Dashboard() {
  useFirebaseToken();

  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    // Simulate a long loading time
    const timer = setTimeout(() => {
        setLoading1(false);

    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen select-none">
        {loading1 ? <div className="w-full h-full flex items-center justify-center text-xs"><Image src = "/logo.png" alt="loading" width={400} height={400} className="w-20" /><ReactLoading type={"bars"} color={"#158235"} height={100} width={100} /></div> :
        <>
        <SideBar />
        <div className="w-full">
        <Header />
        <div className="p-2 h-full overflow-y-auto" style={{height: "calc(100vh - 4rem)"}}>
          <Dashboard1 />
        </div>
      </div>
      </>
      }
      </div>
    </>
  );
}
