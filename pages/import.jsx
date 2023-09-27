import Header from "@/components/common/header";
import Import from "@/components/import";
import SideBar from "@/components/common/sideBar";
import useFirebaseToken from "@/hooks/useFirebaseToken";

export default function Dashboard() {
  useFirebaseToken();
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full">
        <Header />
        <div className="p-2"><Import /></div>
        </div>
      </div>
    </>
  );
}