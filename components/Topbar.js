export default function Topbar({ title, subtitle }) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle ? <p className="text-sm text-slate-500 mt-1">{subtitle}</p> : null}
    </div>
  );
}