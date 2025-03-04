import AdminLayout from "../../adminLayout/AdminLayout";

export default function UploadPage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold text-white">Subir Proyecto</h2>
        <input type="file" className="mt-4 p-2 bg-gray-700 text-white rounded" />
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Subir Archivo
        </button>
      </div>
    </AdminLayout>
  );
}
