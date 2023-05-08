"use client";

import Image from "next/image";
import logo from "@/assets/icon/edution.svg";
import Button from "@/components/button";
import graphicLogo from "@/assets/icon/graphicLogo.svg";
import github from "@/assets/icon/github.svg";
import Link from "next/link";
import React, { createRef } from "react";
import Textfield from "@/components/textfield";
import { CiLock, CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import Loading from "@/components/loading";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Lottie from "lottie-web";
import animation from "@/assets/animation/animation.json";

type IForm = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  let animationRef = createRef<HTMLDivElement>();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: "Please enter a valid email address",
      })
      .required("this field is required"),
    password: yup.string().required("this field is required"),
  });

  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: "onChange", resolver: yupResolver(formSchema) });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  React.useEffect(() => {
    Lottie.setQuality("low");
    const anim = Lottie.loadAnimation({
      container: animationRef.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation,
    });

    if (anim.isLoaded) {
      setIsLoading(false);
      setFocus("email");
    }

    return () => anim.destroy();
  }, []);

  return (
    <div className="w-full h-screen">
      {isLoading && <Loading />}
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

        {/* LOTTIE ANIMATION */}
        <div className="w-fit lg:w-full lg:flex lg:justify-evenly lg:gap-12">
          <div className="hidden xl:flex xl:justify-center xl:items-center">
            <div className="absolute w-[470px] h-[470px] rounded-full bg-[#ED9A9A] " />
            <div className="w-[600px] max-w-[50vw]" ref={animationRef} />
          </div>

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
            <form
              name="loginForm"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center mt-10 mb-0 gap-[21px]"
            >
              <Textfield
                {...register("email")}
                required
                data-testid="email"
                name="email"
                id="email"
                label="Email"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setFocus("password");
                  }
                }}
                LeftIcon={<CiMail size={25} />}
              />

              <Textfield
                {...register("password")}
                required
                data-testid="password"
                name="password"
                id="password"
                label="Password"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    isValid && handleSubmit(onSubmit);
                  }
                }}
                type={hidePassword ? "password" : "text"}
                LeftIcon={<CiLock size={25} />}
                RightIcon={
                  <button
                    data-testid="hidePassword"
                    type="button"
                    onClick={() => setHidePassword((prev) => !prev)}
                  >
                    {hidePassword ? (
                      <AiOutlineEyeInvisible size={25} />
                    ) : (
                      <AiOutlineEye size={25} />
                    )}
                  </button>
                }
              />
              <div
                className={`text-right text-[14px]/[18px] text-[#3366CC] underline decoration-solid`}
              >
                <Link href="#">Forgot Password?</Link>
              </div>

              <Button
                disabled={!isValid}
                name={!isValid ? "login" : "kon"}
                type="submit"
                label="Login"
                className="md:w-full"
              />

              <div className="flex flex-nowrap justify-center items-center gap-2">
                <div className="w-[40%] border-[#BBBBBB] border-b-[1px]"></div>
                <p className={`text-[14px]/[21px]`}>OR</p>
                <div className="w-[40%] border-[#BBBBBB] border-b-[1px]"></div>
              </div>

              <div>
                <Button
                  type="button"
                  label="Continue with Google"
                  variant="outline"
                  LeftIcon={FcGoogle}
                  className="md:w-full"
                />

                <div className="mt-5">
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
            </form>
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
