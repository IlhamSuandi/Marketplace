"use client";
import React from "react";
import Link from "next/link";
import Textfield from "@/components/ui/textfield";
import { CiLock, CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/button";

type IForm = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);

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
    formState: { isValid, errors },
  } = useForm<IForm>({ mode: "onSubmit", resolver: yupResolver(formSchema) });

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    signIn("credentials", data);
  };
  return (
    <form
      name="loginForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center mt-10 mb-0 gap-[21px]"
    >
      <Textfield
        {...register("email")}
        autoFocus
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
        errors={errors.email}
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
        errors={errors.password}
      />

      <div
        className={`text-right text-[14px]/[18px] text-[#3366CC] underline decoration-solid`}
      >
        <Link href="#">Forgot Password?</Link>
      </div>

      <Button
        // disabled={!isValid}
        // name={!isValid ? "login" : "kon"}
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
          onClick={() => signIn("google", { callbackUrl: "/" })}
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
  );
}
