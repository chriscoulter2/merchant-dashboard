import Sidebar from "../../components/Sidebar";
import { DataProvider } from "../../components/DataProvider";

export default function AppShellLayout({ children }) {
  return (
    <DataProvider>
      <main className="min-h-screen bg-slate-100 text-slate-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </main>
    </DataProvider>
  );
}