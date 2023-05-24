import Header from "@/components/common/header";
import AllInverter from "@/components/inverter";
import SideBar from "@/components/common/sideBar";

export default function Projects() {
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full h-full">
          <Header />
          <div
            className="p-1.5 overflow-y-auto"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <AllInverter />
          </div>
        </div>
      </div>
    </>
  );
}
