"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Dropzone from "react-dropzone";
import ProgressBar from "../Progressbar";
import { useRouter } from "next/navigation";

export default function Upload() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clients, setClients] = useState<{ id: number; client_name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectData, setProjectData] = useState({
    project_name: "",
    project_type: "",
    delivery_date: "",
    client_name: "",
    isNewClient: false,
  });
  const [assets, setAssets] = useState<File[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [uploadedProject, setUploadedProject] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("client").select("id, client_name");
      if (!error) setClients(data || []);
    };
    fetchClients();
  }, []);

  const handleDrop = (acceptedFiles: File[], isCover = false) => {
    if (isCover) {
      setCover(acceptedFiles[0]);
    } else {
      setAssets((prev) => [...prev, ...acceptedFiles]);
    }
  };

  const uploadFile = async (file: File, folder: string) => {
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type, folder }),
      });
      if (!res.ok) throw new Error("Error al obtener URL firmada");
      const { uploadUrl, fileUrl } = await res.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!uploadRes.ok) throw new Error("Error al subir archivo a S3");
      return fileUrl;
    } catch (error) {
      console.error("Error en la subida a S3:", error);
      return null;
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setProgress(0);
    try {
      let client_id = null;
      if (projectData.isNewClient) {
        const { data, error } = await supabase.from("client").insert({ client_name: projectData.client_name }).select("id").single();
        if (error) throw error;
        client_id = data.id;
      } else {
        const selectedClient = clients.find(client => client.client_name === projectData.client_name);
        client_id = selectedClient?.id || null;
      }

      const { data: project, error: projectError } = await supabase.from("project").insert({
        project_name: projectData.project_name,
        project_type: projectData.project_type,
        delivery_date: projectData.delivery_date,
        client_id,
      }).select("id").single();
      if (projectError) throw projectError;
      const project_id = project.id;

      const uploadedAssets = [];
      if (cover) {
        const fileUrl = await uploadFile(cover, "cover");
        if (fileUrl) {
          uploadedAssets.push({ url_media: fileUrl, media_type: "photo", media_use: "cover", project_id });
        }
      }
      for (const asset of assets) {
        if (!asset) continue;
        const fileUrl = await uploadFile(asset, `projects/${project_id}`);
        if (fileUrl) {
          uploadedAssets.push({ url_media: fileUrl, media_type: asset.type.includes("video") ? "video" : "photo", media_use: "media", project_id });
        }
        setProgress((prev) => prev + 100 / assets.length);
      }
      await supabase.from("assets").insert(uploadedAssets);
      setUploadedProject(project_id);
      setStep(4);
    } catch (error) {
      console.error("Error uploading project", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 md:bg-transparent flex justify-center">
    <div className="m-20 lg:m-36 p-12 lg:p-6 bg-gray-100 rounded-lg h-auto w-full max-w-3xl mx-auto font-normal">
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl text-oceloteRed">Datos del Proyecto</h2>
          <input 
            className="p-2 border rounded"
            type="text" 
            placeholder="Nombre del proyecto" 
            value={projectData.project_name} 
            onChange={(e) => setProjectData({ ...projectData, project_name: e.target.value })} />
          <select 
            className="p-2 border rounded"
            value={projectData.project_type} 
            defaultValue=""
            onChange={(e) => setProjectData({ ...projectData, project_type: e.target.value })}>
              <option disabled={true} value="">--Selecciona una opción--</option>
              <option value="comercial">Comercial</option>
              <option value="films">Films</option>
              <option value="photo">Photo</option>
          </select>
          <input 
            className="p-2 border rounded"
            type="date" 
            value={projectData.delivery_date} 
            onChange={(e) => setProjectData({ ...projectData, delivery_date: e.target.value })} />
          <input 
            className="p-2 border rounded"
            type="text" 
            placeholder="Buscar cliente..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="p-2 border rounded" onChange={(e) => setProjectData({ ...projectData, client_name: e.target.value })}>
            <option value="">Seleccionar Cliente</option>
            {clients.filter(client => client.client_name.toLowerCase().includes(searchTerm.toLowerCase())).map(client => (
              <option key={client.id} value={client.client_name}>{client.client_name}</option>
            ))}
          </select>
          <div className="flex flex-row gap-4">
            <input 
              type="checkbox" 
              onChange={() => setProjectData({ ...projectData, isNewClient: !projectData.isNewClient })} /> 
              <p className="text-black">Es un cliente nuevo</p>
          </div>
          {projectData.isNewClient && 
            <input 
              className="p-2 border rounded"
              type="text" 
              placeholder="Nuevo Cliente" 
              value={projectData.client_name} 
              onChange={(e) => setProjectData({ ...projectData, client_name: e.target.value })} />}

          <div className="flex justify-between">
            <button onClick={() => router.push("/pages/admin/dashboard")} className="bg-gray-400 px-4 py-2 rounded">Atrás</button>
            <button className="bg-oceloteRed px-4 py-2 rounded" onClick={() => setStep(2)}>Siguiente</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl text-oceloteRed">Carga de Assets</h2>
          <div className="flex flex-col gap-4">
            <Dropzone onDrop={(files) => handleDrop(files, true)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="border-2 border-gray-300 border-dashed rounded-md bg-gray-200 text-center cursor-pointer h-[20lvh] flex justify-center items-center">
                  <input {...getInputProps()} />
                  <p className="text-gray-400 p-4">Sube la portada o arrastra aquí</p>
                </div>
              )}
            </Dropzone>
            {cover && <p className="text-white">Portada subida: {cover.name}</p>}
            <Dropzone onDrop={(files) => handleDrop(files)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}  className="border-2 border-gray-300 border-dashed rounded-md bg-gray-200 text-center cursor-pointer h-[20lvh] flex justify-center items-center">
                  <input {...getInputProps()} />
                  <p className="text-gray-400 p-4">Sube o arrastra aquí las imágenes o video</p>
                </div>
              )}
            </Dropzone>
          </div>
          {assets.map((asset, index) => (
            <p key={index} className="text-white">Imagen subida: {asset.name}</p>
          ))}
          <div className="flex justify-between">
            <button className="bg-gray-400 px-4 py-2 rounded" onClick={() => setStep(1)}>Atrás</button>
            <button className="bg-oceloteRed px-4 py-2 rounded" onClick={() => setStep(3)}>Siguiente</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl text-oceloteRed">Vista previa</h2>
          <div className="flex flex-col gap-5 p-5 border rounded-md bg-gray-200">
            <p className="text-black">📌 Nombre: {projectData.project_name}</p>
            <p className="text-black">🎬 Tipo: {projectData.project_type}</p>
            <p className="text-black">📅 Entrega: {projectData.delivery_date}</p>
            <p className="text-black">👤 Cliente: {projectData.client_name}</p>
            <p className="text-black">📂 Imágenes subidas: {assets.length}</p>
          </div>
          <div className="flex justify-between">
            <button className="bg-gray-400 px-4 py-2 rounded" onClick={() => setStep(2)}>Atrás</button>
            <button className="bg-oceloteRed px-4 py-2 rounded" onClick={handleUpload}>Publicar</button>
          </div>
          
        </div>
      )}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold text-green-500">¡Éxito!</h2>
          <p>Tu proyecto ha sido subido.</p>
        </div>
      )}
      {loading && <ProgressBar progress={progress} />}
    </div>
    </div>
  );
}
