import Header from "@/components/common/header";
import AllInverter from "@/components/inverter";
import SideBar from "@/components/common/sideBar";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/Helper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Custom404 from "../404";

export default function Projects() {
  const router = useRouter();
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
      <div className="flex h-screen bg-gray-200">
        <SideBar />
        <div className="w-full h-full">
          <Header />
          <div
            className="p-1.5 overflow-y-auto"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <AllInverter />
          </div>
        </div>
      </div>
    </>
  );
  }
}
