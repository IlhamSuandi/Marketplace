"use client";
import React, { MutableRefObject } from "react";
import { io } from "socket.io-client";

export const SocketProvider = React.createContext<any>(null);

export const socket = io("ws://localhost:5000");

export function VideoConferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [me, setMe] = React.useState();
  const [users, setUsers] = React.useState<Array<string>>([]);
  const [usersLength, setUsersLength] = React.useState<number>();
  const [stream, setStream] = React.useState<MediaStream>();
  let myVideo = React.useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      let cam = devices.find(function (device) {
        return device.kind === "videoinput";
      });

      let mic = devices.find(function (device) {
        return device.label === "USB Audio Device Mono";
      });

      navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId: mic?.deviceId,
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: true,
          },
          video: cam,
        })
        .then((userMedia) => {
          setStream(userMedia);
          userMedia;
          // myVideo.current.srcObject = userMedia;

          // const audioContext = new AudioContext();
          // const analyser = audioContext.createAnalyser();
          // const microphone = audioContext.createMediaStreamSource(userMedia);

          // analyser.smoothingTimeConstant = 0.8;
          // analyser.fftSize = 1024;
          // microphone.connect(analyser);

          // setInterval(() => {
          //   const array = new Uint8Array(analyser.frequencyBinCount);
          //   analyser.getByteFrequencyData(array);
          //   const arraySum = array.reduce((a, value) => a + value, 0);
          //   const average = arraySum / array.length;
          //   console.log(myVideo.current.srcObject);
          //   if (Math.round(average) >= 10) {
          //     myVideo.current.style.boxSizing = "border-box";
          //     myVideo.current.style.webkitBoxSizing = "border-box";
          //     myVideo.current.style.border = "4px solid lime";
          //   } else {
          //     myVideo.current.style.border = "4px solid transparent";
          //   }
          // }, 100);
        });
    });

    socket.on("userID", (userId) => {
      console.log(userId);
      setMe(userId);
    });

    socket.on("userJoin", (user) => {
      console.log(user);
    });

    socket.on("meeting-users", (users) => {
      setUsers(users);
    });
  }, [socket, myVideo]);

  const joinRoom = (roomId: string, username: string) => {
    socket.emit("meeting", roomId, username);
  };

  return (
    <SocketProvider.Provider
      value={{
        me,
        setMe,
        users,
        setUsers,
        joinRoom,
        usersLength,
        myVideo,
        stream,
      }}
    >
      {children}
    </SocketProvider.Provider>
  );
}
