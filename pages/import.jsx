import Header from "@/components/common/header";
import Import from "@/components/import";
import SideBar from "@/components/common/sideBar";
import useFirebaseToken from "@/hooks/useFirebaseToken";

export default function Dashboard() {
  useFirebaseToken();
  return (
    <>
        <div className="flex h-screen">
          <SideBar />
          <div className="w-full h-full">
            <Header />
            <div
              className="px-1.5 pb-1.5 overflow-y-auto"
              style={{ height: "calc(100vh - 4rem)" }}
            ><Import /></div>
        </div>
      </div>
    </>
  );
}