import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="w-full h-screen">
      <div
        className={`w-full h-screen flex flex-col items-center justify-center xl:p-5 xl:justify-around`}
      >
        {/* LOGO */}
        <Skeleton className="hidden w-[220px] h-12 xl:block bg-slate-200" />

        <div className="w-fit lg:w-full lg:flex lg:justify-evenly lg:gap-12 mb-10">
          {/* LOTTIE ANIMATION */}
          <div className="hidden xl:flex xl:justify-center xl:items-center">
            <div className="relative flex w-[470px] h-[470px] ">
              <Skeleton className="w-full h-full rounded-full bg-slate-200" />
            </div>
          </div>

          {/* CARD */}
          <div className="md:w-[500px] h-full md:bg-[#FFFFFF] rounded-[10px] md:shadow-card-shadow p-10 mb-0">
            <div className="w-full flex justify-center items-center mb-2">
              <Skeleton className="w-[60px] h-[60px] xl:hidden bg-slate-200" />
            </div>
            <Skeleton className="w-32 h-8 m-auto mb-2 bg-slate-200" />
            <Skeleton className="w-32 h-5 m-auto bg-slate-200" />
            <div className="flex flex-col justify-center mt-10 mb-0 gap-[21px]">
              <Skeleton className="w-full h-10 min-w-[200px] bg-slate-200" />
              <Skeleton className="w-full h-10 min-w-[200px] bg-slate-200" />

              <div className="flex justify-end">
                <Skeleton className="w-28 h-5 bg-slate-200" />
              </div>

              <Skeleton className="w-full h-10 bg-slate-200" />

              <div className="flex flex-nowrap justify-center items-center gap-2">
                <div className="w-[40%] border-[#BBBBBB] border-b-[1px]"></div>
                <Skeleton className="w-12 h-4 bg-slate-200" />
                <div className="w-[40%] border-[#BBBBBB] border-b-[1px]"></div>
              </div>

              <div>
                <Skeleton className="w-full h-10 bg-slate-200" />

                <div className="mt-5">
                  <Skeleton className="w-32 h-5 m-auto bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GITHUB FOOTER */}
        <div className="mt-0 md:mt-10 lg:mt-0">
          <Skeleton className="w-36 h-5 bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
