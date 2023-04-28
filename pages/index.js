// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
import LogIn from "@/components/logIn";

export default function Home() {
  return <></>;
}

Home.getLayout = function getLayout(page) {
  return (
    <>
      <LogIn />
    </>
  );
};
