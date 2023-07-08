import Image from "next/image";
import React from "react";
import profilePicture from "@/assets/image/limbo.jpeg";
import Button from "./ui/button";

const MeetingVideo = ({
  stream,
  muted,
}: {
  stream: MediaStream;
  muted?: boolean;
}) => {
  let videoRef = React.useRef<HTMLVideoElement>(
    null
  ) as React.MutableRefObject<HTMLVideoElement>;

  let divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      console.log("first");
      videoRef.current.srcObject = stream;
      const audioContext = new AudioContext();
      const analyser = audioContext.resume().then(() => {
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 2048;
        microphone.connect(analyser);
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
      return () => {
        clearInterval(visualizer);
      };
    } catch (error) {
      throw error;
    }
  }, [stream]);

  return (
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
        <video ref={videoRef} autoPlay className="none w-0" muted={muted} />
      </div>
    </div>
  );
};

export default MeetingVideo;
