"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
//import { uploadFileToS3} from "@/lib/awsUpload"; // Función para subir a S3
import { Asset} from "@/lib/types";
import Dropzone from "react-dropzone";
import ProgressBar from "../Progressbar";

export default function Upload() {
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
  const [assets, setAssets] = useState<Asset[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [uploadedProject, setUploadedProject] = useState(null);

  //Cargar clientes
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("client").select("id, client_name");
      if (error) console.error("Error fetching clients", error);
      if(!error) setClients(data || []);  
    };
    fetchClients();
  }, []);

  //Funcion para manejar la carga de archivos
  const handleDrop = (acceptedFiles: File[], isCover = false) => {
    if (isCover){
      setCover(acceptedFiles[0]);
    } else {
      setAssets((prev) => [...prev, ...acceptedFiles.map((file) => ({ file, media_use: "media" }))]);
    }
  };

  const uploadFile = async (file: File, folder:string) => {
    try{
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          filename: file.name,
          fileType: file.type,
          folder,
        }),
      });
      if (!res.ok) throw new Error("error al obtener URL firmada");
      const {uploadUrl, fileUrl} = await res.json();
      
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {"Content-Type": file.type},
      });

      if(!uploadRes.ok) throw new Error("Error al subir archivo a S3");

      return fileUrl;
    } catch (error){
      console.error("error en la subida a s3:", error);
      return null;
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setProgress(0);
    try{
      let client_id = null;
      //Subir si el cliente es nuevo
      if (projectData.isNewClient){
        const {data, error} = await supabase.from("client").insert({
          client_name: projectData.client_name,
        }).select("id").single();
          if (error) throw error;
          client_id = data.id; //  Se asigna el id del cliente nuevo
      } else {
        const selectedClient = clients.find((client) => client.client_name === projectData.client_name);
        client_id = selectedClient?.id || null; // Se asigna el id del cliente existente
      }
      //Insertar proyecto en Supabase
      const { data: project, error: projectError} = await supabase.from("project").insert({
        project_name: projectData.project_name,
        project_type: projectData.project_type,
        delivery_date: projectData.delivery_date,
        client_id,
      }).select("id").single();
      if (projectError) throw projectError;

      const project_id = project.id; // Se asigna el id del proyecto
      const uploadedAssets = []; // Se almacenan los assets subidos
      
      //Subir portada
      if(cover) {
        const fileUrl = await uploadFile(cover, "cover");
        if (fileUrl){
          uploadedAssets.push ({
            url_media: fileUrl, 
            media_type: "photo", 
            media_use: "cover", 
            project_id
          });
        }
      }
        /*const {uploadUrl, fileUrl} = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: cover.name, 
            fileType: cover.type, 
            folder:"cover"}),
        }).then(res => res.json());
        await fetch(uploadUrl, {method:"PUT", body: cover});*/

        
      
      for (const asset of assets){
        if (!asset.file) continue; // 🔹 Evita el error si file es undefined
        const fileUrl = await uploadFile(asset.file, `projects/${project_id}`); // Agrega el id del proyecto al path
        if (fileUrl){
          uploadedAssets.push({
            url_media: fileUrl, 
            media_type: asset.file.type.includes("video") ? "video" : "photo", 
            media_use: "media", 
            project_id,
          });
        }
        setProgress((prev) => prev + 100 / assets.length);

        /*const {uploadUrl, fileUrl} = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({fileName: asset.file.name, fileType: asset.file.type, folder: `projects/${project_id}`}),
        }).then(res => res.json());*/

        //await fetch(uploadUrl, {method:"PUT", body: asset.file});
        
      }

      await supabase.from("assets").insert(uploadedAssets); // Inserta los assets en la BD
      setUploadedProject(project_id); // Almacena el id del proyecto subido
      setStep(4); // Cambia el paso a 4

    } catch (error){
      console.error("Error uploading project", error);
    }
    setLoading(false);
    };

    return(
      <div className="p-6 bg-gray-900 rounded-lg w-full max-w-3xl mx-auto">
      {step === 1 && (
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Datos del Proyecto</h2>
          <input type="text" placeholder="Project Name" value={projectData.project_name} onChange={(e) => setProjectData({ ...projectData, project_name: e.target.value })} />
          <select value={projectData.project_type} onChange={(e) => setProjectData({ ...projectData, project_type: e.target.value })}>
            <option value="comercial">Comercial</option>
            <option value="films">Films</option>
            <option value="photo">Photo</option>
          </select>
          <input type="date" value={projectData.delivery_date} onChange={(e) => setProjectData({ ...projectData, delivery_date: e.target.value })} />
          <input type="text" placeholder="Buscar cliente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select onChange={(e) => setProjectData({ ...projectData, client_name: e.target.value })}>
            <option value="">Seleccionar Cliente</option>
            {clients.filter(client => client.client_name.toLowerCase().includes(searchTerm.toLowerCase())).map(client => (
              <option key={client.id} value={client.client_name}>{client.client_name}</option>
            ))}
          </select>
          <input 
          type="checkbox" 
          className="flex flex-row"
          onChange={() => setProjectData({ ...projectData, isNewClient: !projectData.isNewClient })} /> Es un cliente nuevo
          {projectData.isNewClient && <input type="text" placeholder="Nuevo Cliente" value={projectData.client_name} onChange={(e) => setProjectData({ ...projectData, client_name: e.target.value })} />}
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-white">Carga de Assets</h2>
          <Dropzone onDrop={(files) => handleDrop(files, true)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="border p-4 text-center text-white cursor-pointer">
                <input {...getInputProps()} />
                <p>Sube la portada o arrastra aquí</p>
              </div>
            )}
          </Dropzone>
          {cover && <p className="text-white">Portada subida: {cover.name}</p>}
          <Dropzone onDrop={(files) => handleDrop(files)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="border p-4 text-center text-white cursor-pointer">
                <input {...getInputProps()} />
                <p>Sube más imágenes o arrastra aquí</p>
              </div>
            )}
          </Dropzone>
          {assets.map((asset, index) => (
            <p key={index} className="text-white">Imagen subida: {asset.file?.name}</p>
          ))}
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}
      {loading && <ProgressBar progress={progress} />}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-white">Vista previa</h2>
          <p>📌 Nombre: {projectData.project_name}</p>
          <p>🎬 Tipo: {projectData.project_type}</p>
          <p>📅 Entrega: {projectData.delivery_date}</p>
          <p>👤 Cliente: {projectData.client_name}</p>
          <p>📂 Imágenes subidas: {assets.length}</p>
          <button onClick={handleUpload}>Publicar</button>
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
    );
      
}