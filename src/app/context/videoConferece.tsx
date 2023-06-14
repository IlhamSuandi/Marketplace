"use client";
import Peer from "peerjs";
import React, { MutableRefObject, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export const SocketProvider = React.createContext<any>(null);

export const socket = io("ws://localhost:5000");

export function VideoConferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [me, setMe] = useState<Peer>();
  const [users, setUsers] = useState<Array<string>>([]);
  const [usersLength, setUsersLength] = useState<number>();
  const [stream, setStream] = useState<MediaStream>();
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>();
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const [audioInputDevices, setAudioInputDevices] =
    useState<MediaDeviceInfo[]>();
  const [videoInputDevices, setVideoInputDevices] =
    useState<MediaDeviceInfo[]>();

  const [userStream, setUserStream] = useState<MediaStream>();

  let myVideo = React.useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  React.useEffect(() => {
    getStreams();
  }, [myVideo, selectedAudioDevice]);

  React.useEffect(() => {
    getDevices();
  }, [selectedAudioDevice, audioInputDevices, videoInputDevices]);

  React.useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const userId = uuidv4();
      const peer = new Peer(userId);
      setMe(peer);
    });
  }, []);

  React.useEffect(() => {
    socket.on("userID", (userId) => {
      console.log(userId);
    });

    socket.on("userJoin", (user: string) => {
      // console.log(user)
    });

    socket.on("meeting-users", (users) => {
      // console.log(users);
      setUsers(users);
    });
  }, [socket, me, stream]);

  React.useEffect(() => {
    console.log(stream);
    if (!me) return;
    if (!stream) return;
    socket.on("userJoin", (userId) => {
      console.log(userId);
      const call = me.call(userId, stream);
      call.answer(stream);
      call.on("stream", (peerStream) => {
        setUserStream(peerStream);
      });
    });

    me.on("call", (call) => {
      call.on("stream", (peerStream) => {
        setUserStream(peerStream);
      });
      call.answer(stream);
    });
  }, [me, stream, userStream]);

  const joinRoom = (roomId: string, username: string, peerId: string) => {
    socket.emit("meeting", roomId, username, peerId);
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
            getStreams();
          };
        });
    });
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
