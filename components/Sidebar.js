"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Uploads", href: "/uploads" },
    { name: "Integrations", href: "/integrations" },
    { name: "Alerts", href: "/alerts" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block min-h-screen">
      <div className="text-2xl font-bold mb-8">Merchant Insight</div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}