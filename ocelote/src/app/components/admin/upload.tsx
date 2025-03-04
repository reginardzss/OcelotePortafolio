"use client";
import { useState } from "react";

export default function UploadComponent() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Selecciona un archivo primero.");
      return;
    }

    // Aquí iría la lógica para subir el archivo a Supabase o AWS S3
    alert(`Archivo seleccionado: ${file.name}`);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white">Subir Proyecto</h2>
      <input type="file" onChange={handleFileChange} className="mt-4 p-2 bg-gray-700 text-white rounded" />
      <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Subir Archivo
      </button>
    </div>
  );
}
