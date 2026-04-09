import Sidebar from "../../components/Sidebar";

export default function AppShellLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1">
          {children}
        </div>
      </div>
    </main>
  );
}