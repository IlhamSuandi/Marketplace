"use client";

import { useSearchParams } from "next/navigation";
import React, { MutableRefObject, useCallback, useState } from "react";
import { socket, SocketProvider } from "@/app/context/videoConferece";
import MeetingVideo from "@/components/meetingVideo";

function MeetingRoom() {
  const { users, setUsers, stream, me } = React.useContext(SocketProvider);
  const search = useSearchParams();
  const room = search.get("id");
  const userName = search.get("username");

  let myVideo = React.useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  const [userStream, setUserStream] = useState<MediaStream>();

  React.useEffect(() => {
    console.log(userStream);
    console.log(stream);
    socket.on("user-left", (data) => {
      setUsers(users.filter((user: any) => user !== data));
    });
  }, [socket, stream]);

  React.useEffect(() => {
    console.log(stream);
    if (!me) return;
    if (!stream) return;
    socket.on("userJoin", (userId) => {
      console.log(userId);
      const call = me.call(userId, stream);
      call.answer(stream);
      call.on("stream", (peerStream: any) => {
        setUserStream(peerStream);
      });
    });

    me.on("call", (call: any) => {
      call.on("stream", (peerStream: any) => {
        setUserStream(peerStream);
      });
      call.answer(stream);
    });
  }, [me, stream, userStream]);

  return (
    <div className="h-screen block border-10">
      <div className="bg-soft-blue h-screen grid grid-cols-12 overflow-y-hidden">
        <div className="border-4 grid grid-cols-[repeat(auto-fit,_16.666666%)] gap-1 content-center justify-center col-span-9 grid-flow-row-dense">
          <MeetingVideo stream={stream} muted />
          {userStream ? <MeetingVideo stream={userStream} /> : null}
        </div>

        <div className="col-span-3">rightbar</div>
        <div className="w-fit h-fit"></div>
      </div>
    </div>
  );
}

export default MeetingRoom;
