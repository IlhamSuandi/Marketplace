// These styles apply to every route in the application

import { ReactNode } from "react";
import { VideoConferenceProvider } from "../context/videoConferece";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <VideoConferenceProvider>{children}</VideoConferenceProvider>
    </main>
  );
}
