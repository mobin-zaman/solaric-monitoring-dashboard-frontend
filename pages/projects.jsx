import Header from "@/components/common/header";
import AllProjects from "@/components/projects";
import SideBar from "@/components/common/sideBar";

export default function Projects() {
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full">
        <Header />
        <div className="p-2"><AllProjects /></div>
        </div>
      </div>
    </>
  );
}
