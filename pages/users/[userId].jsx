import { useRouter } from "next/router";
import SideBar from "@/components/common/sideBar";
import Header from "@/components/common/header";
import User from "@/components/users/user";
import useFirebaseToken from "@/hooks/useFirebaseToken";

export default function UserDetail() {
  useFirebaseToken();
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full">
          <Header />
          <div className="p-2">
            <User userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}