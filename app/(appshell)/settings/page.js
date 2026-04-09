import Topbar from "../../../components/Topbar";

export default function SettingsPage() {
  return (
    <>
      <Topbar
        title="Settings"
        subtitle="Manage account, billing, notifications, and security"
      />

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
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
    </>
  );
}