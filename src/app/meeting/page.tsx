"use client";

import Button from "@/components/button";
import Textfield from "@/components/textfield";
import React, { MutableRefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import profilePicture from "@/assets/image/limbo.jpeg";
import { useRouter } from "next/navigation";
import { SocketProvider, socket } from "../context/videoConferece";
import Image from "next/image";

function Meeting() {
  const { joinRoom, stream } = React.useContext(SocketProvider);
  const { register, handleSubmit } = useForm<{
    name: string;
    roomID: string;
    message: string;
  }>();

  const router = useRouter();

  const onSubmit: SubmitHandler<{
    name: string;
    roomID: string;
    message: string;
  }> = (data) => {
    joinRoom(data.roomID, data.name);
    myVideo.current.srcObject = null;
    router.push(`/meeting/room?id=${data.roomID}&username=${data.name}`);
  };

  let myVideo = React.useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  let divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      myVideo.current.srcObject = stream;

      if (myVideo.current) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 2048;
        microphone.connect(analyser);

        setInterval(() => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const arraySum = array.reduce((a, value) => a + value, 0);
          const average = arraySum / array.length;
          console.log(Math.round(average));
          if (Math.round(average) > 1) {
            divRef.current!.style.boxSizing = "border-box";
            divRef.current!.style.webkitBoxSizing = "border-box";
            divRef.current!.style.border = "4px solid lime";
          } else {
            divRef.current!.style.border = "4px solid black";
          }
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  }, [stream]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textfield {...register("name")} label="name" type="text" />
          <Textfield {...register("roomID")} label="room id" type="text" />
          {/* <Textfield {...register("message")} label="message" type="text" /> */}

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            label="enter room"
          />
          <div className="w-[300px] h-[200px] border bg-black rounded">
            <div
              ref={divRef}
              className="w-[300px] h-[200px] flex justify-center items-center"
            >
              <div>
                <Image
                  src={profilePicture}
                  alt="profile pic"
                  width={180}
                  className="mask mask-square rounded"
                />
              </div>

              <video ref={myVideo} autoPlay className="none w-0" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Meeting;
