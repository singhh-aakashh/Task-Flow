
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
 
  return (
    <main className="flex items-center justify-center flex-col">
      <Navbar />
      <div className="flex items-center pt-40 flex-col">
        <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
          Automate your Work
        </h1>
        <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
          with TaskFlow
        </h1>
        <Button
          size={"lg"}
          
          className="p-8 mt-10 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
        >
          <Link href={"/sign-in"}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
            Start For Free Today
          </span>
          </Link>
        </Button>
        <div className="max-w-5xl mt-4 mx-auto h-[30rem] md:h-[600px] w-full  p-6 bg-[#222222] rounded-[30px] shadow-2xl">
          <div className="bg-gray-100 h-full w-full rounded-2xl  gap-4 overflow-hidden  transition-all ">
            <img
              src="/work.png"
              alt="bannerImage"
              className="object-cover w-fit h-fit border-8 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
