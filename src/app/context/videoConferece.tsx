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
  const [selectedAudioDevice, setSelectedAudioDevice] =
    React.useState<string>();
  const [permissionGranted, setPermissionGranted] =
    React.useState<boolean>(false);

  const [audioInputDevices, setAudioInputDevices] =
    React.useState<MediaDeviceInfo[]>();
  const [videoInputDevices, setVideoInputDevices] =
    React.useState<MediaDeviceInfo[]>();

  let myVideo = React.useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  React.useEffect(() => {
    getStreams();
  }, [myVideo, selectedAudioDevice]);

  React.useEffect(() => {
    getDevices();
  }, [selectedAudioDevice, audioInputDevices]);

  React.useEffect(() => {
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
  }, [socket]);

  const joinRoom = (roomId: string, username: string) => {
    socket.emit("meeting", roomId, username);
  };

  function getDevices() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const mic = devices.filter((device) => device.kind === "audioinput");
      const cam = devices.filter((device) => device.kind === "videoinput");
      setAudioInputDevices(mic);
      setVideoInputDevices(cam);
    });
  }

  function getStreams() {
    stream?.getTracks().forEach((track) => {
      track.stop();
    });

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: selectedAudioDevice,
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: true,
        },
        video: false,
      })
      .then((userMedia) => {
        setStream(userMedia);
        setPermissionGranted(true);
      })
      .catch((err) => setPermissionGranted(false));
  }

  function muteMic() {
    if (stream) {
      return (stream.getAudioTracks()[0].enabled =
        !stream.getAudioTracks()[0].enabled);
    }
  }

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
        audioInputDevices,
        setAudioInputDevices,
        selectedAudioDevice,
        setSelectedAudioDevice,
        permissionGranted,
        getStreams,
        muteMic,
      }}
    >
      {children}
    </SocketProvider.Provider>
  );
}
