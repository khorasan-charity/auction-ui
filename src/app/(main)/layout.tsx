import SidebarProvider from "@/context/SidebarContext";
import ToggleSidebar from "@/ui/ToggleSidebar";
import Sidebar from "./Sidebar";

export default async function MainLayoutOld({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-screen">
      <div className="w-full h-full">
        <main className="h-full flex-1 overflow-hidden hideSB container w-full xl:max-w-screen-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
