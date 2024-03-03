import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className=" w-full min-h-screen grid content-center justify-items-center bg-black text-white">
      <h1 className="text-5xl">Basic Commerce</h1>
      <div className=" lg:flex lg:gap-10  my-5 lg:mt-20">
        <Link className="p-3 bg-blue-600 mx-auto hover:bg-blue-800 text-white text-center md:w-[200px] w-full rounded" href={"/pages/login"}>
          Login
        </Link>
        <Link className="p-3 bg-green-600 mx-auto hover:bg-green-800 text-center text-white md:w-[200px] w-full rounded" href={"/pages/register"}>
          Register
        </Link>
      </div>
    </main>
  );
}
