import Image from "next/image";
import Button from "@/components/button";
import logo from "@public/logo.svg";
import github from "@public/github.svg";
import Link from "next/link";
import Head from "next/head";
import React from "react";
import { useRef, useState, useEffect } from "react";
import Textfield from "@/components/textfield";
import { CiLock, CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const ref = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    import("@lottiefiles/lottie-player").then((onfulfilled) =>
      setLoading(false)
    );
  });

  if (loading)
    return (
      <h1 className="w-full h-screen flex justify-center items-center ">
        Loading...
      </h1>
    );

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-evenly text-[#A7A7A7]`}
    >
      <Head>
        <title>Marketplace - Login</title>
      </Head>

      <Image src={logo} alt="marketplace" width="250" quality={10} />
      <div className="flex justify-centar gap-16">
        <div className="flex justify-center items-center">
          <div className="absolute w-[470px] h-[470px] rounded-full bg-[#ED9A9A] " />
          <lottie-player
            id="firstLottie"
            ref={ref}
            autoplay
            loop
            mode="normal"
            src="https://assets1.lottiefiles.com/packages/lf20_5ngs2ksb.json"
            style={{ width: "600px" }}
          ></lottie-player>
        </div>

        {/* CARD */}
        <div className="w-[450px] h-full bg-[#FFFFFF] rounded-[10px] shadow-card-shadow text-center p-10 mb-6">
          <h1 className={`font-normal text-[30px]/[45px] text-[#737373]`}>
            Welcome!
          </h1>
          <p className={`text-[16px]/[24px]`}>Log in your account</p>

          <div className="flex flex-col justify-center mt-[30px] mb-[13px] gap-[21px]">
            <Textfield label="Email" Icon={CiMail} />
            <Textfield label="Password" type="password" Icon={CiLock} />

            <Link
              href="#"
              className={`text-right text-[14px]/[18px] text-[#3366CC] underline decoration-solid`}
            >
              Forgot Password?
            </Link>

            <Button label="Login" />

            <div className="flex flex-nowrap justify-center items-center gap-2">
              <div className="w-[40%] border-[#BBBBBB] border-b-[1px]"></div>
              <p className={`text-[14px]/[21px]`}>OR</p>
              <div className="w-[40%] border-[#BBBBBB] border-b-[1px]"></div>
            </div>

            <div>
              <Button
                label="Continue with Google"
                variant="outline"
                LeftIcon={FcGoogle}
              />

              <div className="mt-4">
                <p className={`text-center text-[14px]/[18px]`}>
                  Don’t have account ?{" "}
                  <span>
                    <Link
                      href="#"
                      className="text-[#3366CC] underline decoration-solid"
                    >
                      Sign Up
                    </Link>{" "}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative bottom-0 flex gap-2 items-center">
        <Image src={github} alt="github-icon" quality={10} />
        <p className={`text-[rgba(0, 0, 0, 0.6);] text-[14px]/[27px]`}>
          ilhamSuandi | Portofolio Website
        </p>
      </footer>
    </div>
  );
}

export default Login;
