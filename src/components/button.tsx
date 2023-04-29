import React, { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

const buttonVariants = cva(
  "flex flex-row justify-center items-center gap-3 rounded",
  {
    variants: {
      variant: {
        default: "bg-[#60C6FF] text-white",
        outline: "border-2 button-shadow --font-poppins text-[14px]",
      },
      size: {
        default: "w-[369px] px-3 py-2",
        sm: "w-[200px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
  LeftIcon?: IconType;
  RightIcon?: IconType;
}

export default function button({
  label,
  LeftIcon,
  RightIcon,
  className,
  size,
  variant,
  ...rest
}: Props) {
  return (
    <button
      className={twMerge(clsx(buttonVariants({ variant, size, className })))}
      {...rest}
    >
      {LeftIcon && <LeftIcon size={25} />}
      <p>{label}</p>
      {RightIcon && <RightIcon size={25} />}
    </button>
  );
}
