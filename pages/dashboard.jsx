import Header from "@/components/common/header";
import Dashboard1 from "@/components/dashboard";
import SideBar from "@/components/common/sideBar";
import useFirebaseToken from "@/hooks/useFirebaseToken";

export default function Dashboard() {
  useFirebaseToken();
  return (
    <>
      <div className="flex h-screen ">
        <SideBar />
        <div className="w-full">
        <Header />
        <div className="p-2 h-full bg-gray-200 overflow-y-auto" style={{height: "calc(100vh - 4rem)"}}>
          <Dashboard1 />
          <span className="font-bold bg-green-700 text-white p-2 rounded-md ml-5 px-10 py-2.5">Powered by Solaric</span>
        </div>
      </div>
      </div>
    </>
  );
}
