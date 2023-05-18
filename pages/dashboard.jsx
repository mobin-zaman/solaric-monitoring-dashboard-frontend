import Header from "@/components/common/header";
import Dashboard1 from "@/components/dashboard";
import SideBar from "@/components/common/sideBar";

export default function Dashboard() {
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full">
        <Header />
        <div className="p-2"><Dashboard1 /></div>
        </div>
      </div>
    </>
  );
}
