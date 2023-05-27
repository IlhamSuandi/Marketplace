"use client";

import Button from "@/components/button";
import Textfield from "@/components/textfield";
import React, { MutableRefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import profilePicture from "@/assets/image/limbo.jpeg";
import { useRouter } from "next/navigation";
import { SocketProvider } from "../context/videoConferece";
import Image from "next/image";

interface IContext {
  joinRoom: (roomId: string, username: string) => void;
  stream: MediaStream;
  audioInputDevices: MediaDeviceInfo[];
  selectedAudioDevice: string;
  setSelectedAudioDevice: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  permissionGranted: boolean;
  muteMic: () => boolean | undefined;
}

function Meeting() {
  const {
    joinRoom,
    stream,
    audioInputDevices,
    selectedAudioDevice,
    setSelectedAudioDevice,
    permissionGranted,
    muteMic,
  } = React.useContext<IContext>(SocketProvider);
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

  React.useLayoutEffect(() => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.resume().then(() => {
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 2048;
        microphone.connect(analyser);
        myVideo.current.srcObject = stream;
        return analyser;
      });
      const visualizer = setInterval(async () => {
        const array = new Uint8Array((await analyser).frequencyBinCount);
        (await analyser).getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        // console.log(average / 100);
        if (Math.round(average) > 5) {
          divRef.current!.style.boxSizing = "border-box";
          divRef.current!.style.webkitBoxSizing = "border-box";
          divRef.current!.style.border = `4px solid rgba(0, 255, 56, ${
            average / 10
          })`;
        } else {
          divRef.current!.style.border = "4px solid rgba(0, 255, 56,0)";
        }
      }, 100);
      return () => clearInterval(visualizer);
    } catch (error) {
      console.error(error);
    }
  }, [stream]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textfield {...register("name")} label="name" type="text" />
          <Textfield {...register("roomID")} label="room id" type="text" />

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            label="enter room"
          />
          <div className="w-[300px] h-[200px] border bg-black rounded">
            <div
              ref={divRef}
              className="w-[300px] h-[200px] flex justify-center items-center border-4 border-transparent transition-all duration-200"
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
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">select audio device</span>
          </label>
          <select
            className="select select-bordered"
            onChange={(e) => {
              setSelectedAudioDevice(e.target.value);
            }}
          >
            {!permissionGranted ? (
              <option>Please allow the permissions</option>
            ) : (
              audioInputDevices?.map(
                (device: MediaDeviceInfo, index: number) => (
                  <option
                    key={index}
                    value={device.deviceId}
                    defaultValue={selectedAudioDevice}
                  >
                    {device.label}
                  </option>
                )
              )
            )}
          </select>

          <button onClick={muteMic}>mute </button>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
