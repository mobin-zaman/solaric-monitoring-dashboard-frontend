import { useRouter } from "next/router";
import SideBar from "@/components/common/sideBar";
import Header from "@/components/common/header";
import Project from "@/components/projects/project";

export default function UserDetail() {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full h-full">
          <Header />
          <div className="p-1.5 overflow-y-auto" style={{ height: "calc(100vh - 4rem)" }}>
            <Project projectId={projectId} />
          </div>
        </div>
      </div>
    </>
  );
}