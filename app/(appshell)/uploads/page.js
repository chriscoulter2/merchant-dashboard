import Topbar from "../../../components/Topbar";

export default function UploadsPage() {
  return (
    <>
      <Topbar
        title="Uploads"
        subtitle="Upload CSV sales files and review import history"
      />

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50">
            <p className="text-lg font-semibold mb-2">Drag and drop CSV here</p>
            <p className="text-slate-500 mb-4">or click below to choose a file</p>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold">
              Choose File
            </button>
          </div>
        </div>
      </div>
    </>
  );
}