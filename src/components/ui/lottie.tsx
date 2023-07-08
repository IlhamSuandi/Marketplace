"use client";
import Lottie from "lottie-web";
import React, { createRef } from "react";
import animation from "@/assets/animation/animation.json";

export default function LottieAnimation() {
  let animationRef = createRef<HTMLDivElement>();
  React.useEffect(() => {
    Lottie.setQuality("low");
    const anim = Lottie.loadAnimation({
      container: animationRef.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets8.lottiefiles.com/packages/lf20_ikvz7qhc.json",
      animationData: animation,
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className="hidden xl:flex xl:justify-center xl:items-center">
      <div className="relative flex w-[470px] h-[470px] rounded-full bg-[#ED9A9A]">
        <div ref={animationRef} />
      </div>
    </div>
  );
}
