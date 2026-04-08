import Link from "next/link";

export default function UploadsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-blue-600 font-medium">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 mt-4">
          <h1 className="text-3xl font-bold mb-2">Uploads</h1>
          <p className="text-slate-500 mb-6">
            This is where merchants will upload CSV sales files.
          </p>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50">
            <p className="text-lg font-semibold mb-2">Drag and drop CSV here</p>
            <p className="text-slate-500 mb-4">or click below to choose a file</p>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold">
              Choose File
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}