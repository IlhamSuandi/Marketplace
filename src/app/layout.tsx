// These styles apply to every route in the application
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

export const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Edution",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-poppins font-normal bg-soft-blue`}
    >
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
