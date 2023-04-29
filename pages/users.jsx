import Header from "@/components/common/header";
import AllUsers from "@/components/users";
import SideBar from "@/components/common/sideBar";

export default function Users() {
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full">
        <Header />
        <div className="p-2"><AllUsers /></div>
        </div>
      </div>
    </>
  );
}
