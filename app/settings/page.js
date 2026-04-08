import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-blue-600 font-medium">← Back to Dashboard</Link>
        <div className="bg-white rounded-2xl shadow-sm p-8 mt-4">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-slate-500 mb-6">Account, billing, and notification settings will live here.</p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Account</h2>
              <p className="text-sm text-slate-500">Manage profile, team members, and roles.</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Billing</h2>
              <p className="text-sm text-slate-500">Manage subscription plan and payment method.</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Notifications</h2>
              <p className="text-sm text-slate-500">Control email and alert preferences.</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Security</h2>
              <p className="text-sm text-slate-500">Password, access control, and audit logs.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}