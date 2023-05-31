import { useRouter } from "next/router";
import SideBar from "@/components/common/sideBar";
import Header from "@/components/common/header";
import Building from "@/components/building/building";
import useFirebaseToken from "@/hooks/useFirebaseToken";

export default function UserDetail() {
  useFirebaseToken();
  const router = useRouter();
  const { buildingId } = router.query;

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full h-full">
          <Header />
          <div className="p-1.5 overflow-y-auto" style={{ height: "calc(100vh - 4rem)" }}>
            <Building buildingId={buildingId} />
          </div>
        </div>
      </div>
    </>
  );
}