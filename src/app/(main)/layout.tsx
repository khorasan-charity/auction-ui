import SidebarProvider from "@/context/SidebarContext";
import ToggleSidebar from "@/ui/ToggleSidebar";
import Sidebar from "./Sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-screen">
      <div className="w-full h-full flex gap-x-4">
        <SidebarProvider>
          <ToggleSidebar />
          <Sidebar />
          <main className="h-full flex-1 overflow-y-auto hideSB container w-full xl:max-w-screen-xl px-4">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
