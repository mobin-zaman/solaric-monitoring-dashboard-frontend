import { useEffect } from "react";
import { authentication } from "@/config/firebase";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/Helper";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function UseFirebaseToken() {
  const router = useRouter();
  const { data: currentUserData, isError } = useQuery(
    "currentUser",
    getCurrentUser
  );

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      console.log("Checking token");
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("Token") !== null &&
        localStorage.getItem("email") !== "undefined" &&
        localStorage.getItem("password") !== ""
      ) {
        console.log("Token found");
        console.log(currentUserData);
        if (!currentUserData && isError) {
          console.log("Token expired", currentUserData, isError);
          const email = localStorage.getItem("email");
          const password = localStorage.getItem("password");
          try {
            const response = await signInWithEmailAndPassword(
              authentication,
              email,
              password
            );
            localStorage.setItem("Token", response.user.accessToken);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            router.push("/dashboard");
          } catch (error) {
            router.push("/");
          }
        }
      } else {
        console.log("Token not found");
        router.push("/");
      }
    };

    checkTokenAndRedirect();
  }, [currentUserData, isError, router]);

  return null;
}





