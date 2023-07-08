"use client";

import Button from "@/components/ui/button";
import Textfield from "@/components/ui/textfield";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SocketProvider } from "../context/videoConferece";
import MeetingVideo from "@/components/meetingVideo";
import Peer from "peerjs";

interface IContext {
  joinRoom: (roomId: string, username: string, peerId?: string) => void;
  stream: MediaStream;
  audioInputDevices: MediaDeviceInfo[];
  selectedAudioDevice: string;
  setSelectedAudioDevice: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  permissionGranted: boolean;
  muteMic: () => boolean | undefined;
  me: Peer | undefined;
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
    me,
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
    joinRoom(data.roomID, data.name, me?.id);
    router.push(`/meeting/room?id=${data.roomID}&username=${data.name}`);
  };

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

          <MeetingVideo stream={stream} />
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
            defaultValue={selectedAudioDevice}
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

          <button onClick={muteMic}>mute</button>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
