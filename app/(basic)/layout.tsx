import { Toaster } from "react-hot-toast";
import "../globals.css";
import UserLayout from "@/components/layout/user-layout";
import UserFooter from "@/components/layout/user-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning={true} className={`antialiased`}>
        <div className="pt-16">
          <div className="z-20 fixed top-0 left-0 bg-white border-b w-full shadow">
            <UserLayout />
          </div>
          <main className="mb-20 max-w-screen-lg mx-auto px-2">{children}</main>
          <UserFooter />
        </div>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: "w-fit" }} />
      </body>
    </html>
  );
}
