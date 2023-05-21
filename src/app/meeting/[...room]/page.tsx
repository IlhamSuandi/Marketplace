"use client";

import Button from "@/components/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { MutableRefObject, useCallback } from "react";
import profilePicture from "@/assets/image/limbo.jpeg";
import { io } from "socket.io-client";
import { SocketProvider, socket } from "@/app/context/videoConferece";

function MeetingRoom() {
  const { users, setUsers, stream } = React.useContext(SocketProvider);
  const search = useSearchParams();
  const room = search.get("id");
  const userName = search.get("username");

  let myVideo = React.useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  const shareScreen = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      navigator.mediaDevices
        .getDisplayMedia({
          audio: {
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: true,
          },
          video: true,
        })
        .then((userMedia) => {
          myVideo.current.srcObject = userMedia;

          const audioContext = new AudioContext();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(userMedia);
          const scriptProcessor = audioContext.createScriptProcessor(
            2048,
            1,
            1
          );

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;

          microphone.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(audioContext.destination);
          scriptProcessor.onaudioprocess = function () {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            console.log(Math.round(average));
            if (Math.round(average) !== 0) {
              myVideo.current.style.boxSizing = "border-box";
              myVideo.current.style.webkitBoxSizing = "border-box";
              myVideo.current.style.border = "4px solid lime";
            } else {
              myVideo.current.style.border = "4px solid transparent";
            }
          };

          userMedia.getVideoTracks()[0].onended = () => {
            audioContext.close();
            analyser.disconnect();
            microphone.disconnect();
            myVideo.current.srcObject = null;
            myVideo.current.style.border = "4px solid transparent";
          };
        });
    });
  };

  React.useEffect(() => {
    socket.on("user-left", (data) => {
      setUsers(users.filter((user: any) => user !== data));
    });

    myVideo.current.srcObject = stream;
  }, [socket]);

  return (
    <div className="h-screen block border-10">
      <div className="bg-soft-blue h-screen grid grid-cols-12 overflow-y-hidden">
        <div className="border-4 grid grid-cols-[repeat(auto-fit,_16.666666%)] gap-1 content-center justify-center col-span-9 grid-flow-row-dense">
          {users.map((user: string, index: number) => (
            <Image
              key={index}
              src={profilePicture}
              alt="profile pic"
              className="rounded-sm"
            />
          ))}
        </div>

        <div className="col-span-3">rightbar</div>
        <div className="w-fit h-fit">
          <Button label="share screen" onClick={shareScreen} />
          <Button label="testing" onClick={() => console.log(users)} />
          <video ref={myVideo} autoPlay />
        </div>
      </div>
    </div>
  );
}

export default MeetingRoom;
