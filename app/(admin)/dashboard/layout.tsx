import AdminLayout from "@/components/layout/admin-layout";
import "../../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning={true} className={`antialiased`}>
        <div className="pt-16">
          <div className="z-20 fixed top-0 left-0 bg-white border-b w-full">
            <AdminLayout />
          </div>
          <main className="mb-20 max-w-screen-lg mx-auto px-2">{children}</main>
        </div>
      </body>
    </html>
  );
}
