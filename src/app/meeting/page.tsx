"use client";
import Button from "@/components/button";
import Textfield from "@/components/textfield";
import React, { MutableRefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import io from "socket.io-client";

function Meeting() {
  const socket = io("ws://localhost:5000");
  const { register, handleSubmit } = useForm<{
    name: string;
    roomID: string;
    message: string;
  }>();
  let myVideo = React.useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      let cam = devices.find(function (device) {
        return device.kind === "videoinput";
      });
      let mic = devices.find(function (device) {
        return device.kind === "audioinput";
      });

      navigator.mediaDevices
        .getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: true,
          },
          video: cam,
        })
        .then((userMedia) => {
          console.log(userMedia.getAudioTracks());
          myVideo.current.srcObject = userMedia;
        });
    });

    socket.on("messages", (data) => {
      console.log(data);
    });

    socket.on("userID", (data) => {
      console.log(data);
    });

    socket.on("private-message", (data) => {
      console.log(data);
    });
  }, [socket]);

  const onSubmit: SubmitHandler<{
    name: string;
    roomID: string;
    message: string;
  }> = (data) => {
    socket.emit("chat", data.message, data.roomID, data.name);

    // socket.emit("pm", data.name, data.roomID, data.message);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textfield {...register("name")} label="name" type="text" />
          <Textfield {...register("roomID")} label="room id" type="text" />
          <Textfield {...register("message")} label="message" type="text" />

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            label="enter room"
          />
        </form>
      </div>
      <video ref={myVideo} autoPlay />
    </div>
  );
}

export default Meeting;
