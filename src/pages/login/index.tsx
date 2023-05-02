import Image from "next/image";
import logo from "@public/logo.svg";
import Button from "@/components/button";
import graphicLogo from "@public/graphicLogo.svg";
import github from "@public/github.svg";
import Link from "next/link";
import Head from "next/head";
import React from "react";
import Textfield from "@/components/textfield";
import { CiLock, CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import Loading from "@/components/loading";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";

type IForm = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  React.useEffect(() => {
    import("@lottiefiles/lottie-player").then((onfulfilled) =>
      setIsLoading(false)
    );
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div
      className={`w-full h-screen overflow-x-hidden bg-white text-[#A7A7A7] flex flex-col items-center justify-center gap-14 xl:justify-evenly`}
    >
      {/* WEB TITLE */}
      <Head>
        <title>Marketplace - Login</title>
      </Head>
      {/* LOGO */}
      <Image
        src={logo}
        alt="marketplace"
        width="250"
        quality={10}
        className="hidden xl:block"
      />
      {/* LOTTIE ANIMATION */}
      <div className="w-fit lg:w-full lg:flex lg:justify-center lg:gap-12">
        <div className="hidden xl:flex xl:justify-center xl:items-center">
          <div className="absolute w-[470px] h-[470px] rounded-full bg-[#ED9A9A] " />
          <lottie-player
            id="firstLottie"
            // ref={this.ref}
            autoplay
            loop
            mode="normal"
            src="https://assets1.lottiefiles.com/packages/lf20_5ngs2ksb.json"
            style={{ width: "600px" }}
          ></lottie-player>
        </div>

        {/* CARD */}
        <div className="md:w-[500px] h-full md:bg-[#FFFFFF] rounded-[10px] md:shadow-card-shadow text-center p-10 mb-0">
          <div className="w-full flex justify-center items-center mb-0">
            <Image
              src={graphicLogo}
              alt="marketplace"
              width="50"
              quality={10}
              className="xl:hidden"
            />
          </div>
          <h1 className={`font-normal text-[30px]/[45px] text-[#737373]`}>
            Welcome!
          </h1>
          <p className={`text-[16px]/[24px]`}>Log in your account</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center mt-10 mb-0 gap-[21px]"
          >
            <Textfield
              {...register("email")}
              name="email"
              id="email"
              label="Email"
              LeftIcon={<CiMail size={25} />}
            />
            <Textfield
              {...register("password")}
              name="password"
              id="password"
              label="Password"
              type={hidePassword ? "password" : "text"}
              LeftIcon={<CiLock size={25} />}
              RightIcon={
                <button
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

            <Link
              href="#"
              className={`text-right text-[14px]/[18px] text-[#3366CC] underline decoration-solid`}
            >
              Forgot Password?
            </Link>

            <Button type="submit" label="Login" className="md:w-full" />

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
      <footer>
        <a
          href="https://github.com/IlhamSuandi?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bottom-0 flex gap-2 items-center"
        >
          <div className="w-fit">
            <Image
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
  );
}
