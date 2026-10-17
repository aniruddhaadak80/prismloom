import TopNav from "@/components/nav/TopNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#05060a] text-white">
        <TopNav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
