import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.variable} font-poppins font-normal`}>
      <Component {...pageProps} />;
    </main>
  );
}
