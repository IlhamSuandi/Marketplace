"use client";
import Link from "next/link";
import Button from "@/components/ui/button";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/components/ui/loading";
import Image from "next/image";

export default function Home() {
  const { data: session, status, update } = useSession();

  if (status === "unauthenticated") return redirect("/login");
  if (status === "loading") return <Loading />;

  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        {session?.user?.image && (
          <Image
            src={session?.user?.image!}
            alt="profile pic"
            width={100}
            height={100}
            priority
            placeholder="blur"
            blurDataURL={session?.user?.image!}
          />
        )}
        <h1>{`welcome back ${session?.user?.email}`}</h1>
        <Link href="/login">
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            label="Sign Out"
          ></Button>
        </Link>
        <button></button>
      </div>
    </div>
  );
}
