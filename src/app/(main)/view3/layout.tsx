import SidebarProvider from "@/context/SidebarContext";
import ToggleSidebar from "@/ui/ToggleSidebar";
import Sidebar from "../Sidebar";
import Sidebar2 from "../Sidebar2";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="w-full h-full flex">
        <SidebarProvider>
          <ToggleSidebar />
          <Sidebar2 />
          <main className="h-full flex-1 overflow-hidden hideSB  w-full">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
