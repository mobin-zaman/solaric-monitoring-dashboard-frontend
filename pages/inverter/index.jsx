import Header from "@/components/common/header";
import AllInverter from "@/components/inverter";
import SideBar from "@/components/common/sideBar";

export default function Projects() {
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full">
        <Header />
        <div className="p-2"><AllInverter /></div>
        </div>
      </div>
    </>
  );
}
