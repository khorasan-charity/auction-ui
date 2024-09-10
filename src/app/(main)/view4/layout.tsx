export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="w-full h-full flex">
        <main className="light h-full flex-1 overflow-hidden hideSB w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
