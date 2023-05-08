import Link from "next/link";
import Button from "@/components/button";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");

  // return (
  //   <div className="min-h-screen max-h-screen flex items-center justify-center">
  //     <div className="flex flex-col items-center">
  //       <h1>testing</h1>
  //       <Link href="/login">
  //         <Button label="Login Page"></Button>
  //       </Link>
  //       <button></button>
  //     </div>
  //   </div>
  // );
}
