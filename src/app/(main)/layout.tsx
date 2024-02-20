import Sidebar from "./Sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container xl:max-w-screen-xl h-screen py-3">
      <div className="w-full h-full flex gap-x-4">
        <Sidebar />
        <main className="h-full flex-1 overflow-y-auto hideSB">{children}</main>
      </div>
    </div>
  );
}
