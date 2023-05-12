import { useRouter } from "next/router";
import SideBar from "@/components/common/sideBar";
import Header from "@/components/common/header";
import Inverter from "@/components/inverter/inverter";

export default function UserDetail() {
  const router = useRouter();
  const { inverterId } = router.query;

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full h-full">
          <Header />
          <div className="p-1.5 overflow-y-auto" style={{ height: "calc(100vh - 4rem)" }}>
            <Inverter inverterId={inverterId} />
          </div>
        </div>
      </div>
    </>
  );
}