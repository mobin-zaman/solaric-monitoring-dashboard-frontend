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
        </div>
      </div>
      </div>
    </>
  );
}
