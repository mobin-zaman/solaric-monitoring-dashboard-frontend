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
        <div className="w-full">
          <Header />
          <div className="p-2">
            <Project projectId={projectId} />
          </div>
        </div>
      </div>
    </>
  );
}