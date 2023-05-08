// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
import LogIn from "@/components/logIn";
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();

  //if Token is not null, redirect to users page
  if (localStorage.getItem("Token") !== null) {
    router.push("/users");
  }

  return <></>;
}

Home.getLayout = function getLayout(page) {
  return (
    <>
      <LogIn />
    </>
  );
};
