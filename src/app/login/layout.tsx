// These styles apply to every route in the application

export const metadata = {
  title: "Edution - Login",
  description: "Edution login page",
};
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
