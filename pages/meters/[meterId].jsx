import { useRouter } from "next/router";
import SideBar from "@/components/common/sideBar";
import Header from "@/components/common/header";
import Meter from "@/components/meters/meter";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/Helper";
import { useEffect, useState } from "react";
import Custom404 from "../404";
import useFirebaseToken from "@/hooks/useFirebaseToken";

export default function MeterPage() {
  useFirebaseToken();
  const router = useRouter();
  const { meterId } = router.query;

  const [isLoading, setIsLoading] = useState();
  const { data } = useQuery("currentUser", getCurrentUser);

  useEffect(() => {
    if (data) {
      if (data?.role === "ADMIN") {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [data, router]);

  if (isLoading === false) {
    // Render a custom 404 page if user doesn't have access or while fetching user data
    return <Custom404 />;
  }
  if (isLoading === true) {
    return (
      <>
        <div className="flex h-screen">
          <SideBar />
          <div className="w-full h-full">
            <Header />
            <div
              className="px-1.5 pb-1.5 overflow-y-auto"
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <Meter meterId={meterId} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
