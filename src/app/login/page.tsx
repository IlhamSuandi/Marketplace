"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/icon/edution.svg";
import graphicLogo from "@/assets/icon/graphicLogo.svg";
import github from "@/assets/icon/github.svg";
import { poppins } from "../fonts";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/loading";
import LottieAnimation from "@/components/ui/lottie";
import LoginForm from "@/components/loginForm";

export default function Login() {
  const { status } = useSession();

  // if (status === "loading") return <Loading />;
  // if (status === "authenticated") return redirect("/");

  return (
    <div className={`w-full h-screen ${poppins.className}`}>
      <div
        className={`w-full h-screen overflow-x-hidden text-[#A7A7A7] flex flex-col items-center justify-center xl:p-5 xl:justify-around`}
      >
        {/* LOGO */}
        <Image
          priority
          src={logo}
          alt="marketplace"
          width="220"
          quality={10}
          className="hidden xl:block"
        />

        <div className="w-fit lg:w-full lg:flex lg:justify-evenly lg:gap-12">
          {/* LOTTIE ANIMATION */}
          <LottieAnimation />

          {/* CARD */}
          <div className="md:w-[500px] h-full md:bg-[#FFFFFF] rounded-[10px] md:shadow-card-shadow text-center p-10 mb-0">
            <div className="w-full flex justify-center items-center mb-2">
              <Image
                priority
                src={graphicLogo}
                alt="marketplace"
                width="60"
                quality={10}
                className="xl:hidden"
              />
            </div>
            <h1
              className={`login font-normal text-[30px]/[45px] text-[#737373]`}
            >
              Welcome!
            </h1>
            <p className={`text-[16px]/[24px]`}>Log in your account</p>
            <LoginForm />
          </div>
        </div>

        {/* GITHUB FOOTER */}
        <footer className="mt-0 md:mt-10 lg:mt-0">
          <a
            href="https://github.com/IlhamSuandi?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bottom-0 flex gap-2 items-center"
          >
            <div className="w-fit">
              <Image
                priority
                src={github}
                alt="github-icon"
                quality={10}
                className="w-5 md:w-6"
              />
            </div>
            <p
              className={`text-[rgba(0, 0, 0, 0.6);] text-[12px]/[27px] md:text-[14px]/[27px]`}
            >
              ilhamSuandi | Portofolio Website
            </p>
          </a>
        </footer>
      </div>
    </div>
  );
}
