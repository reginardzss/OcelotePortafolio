"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import { Project, Asset } from "@/lib/types";

export default function ProjectDetail() {
  const { id } = useParams(); // Obtener el id de la URL
  const [project, setProject] = useState<Project | null>(null); // Estado para almacenar el proyecto
  const [mediaAssets, setMediaAssets] = useState<Asset[]>([]); // Estado para almacenar los assets de contenido

  useEffect(() => {
    // Función para obtener el proyecto
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("project")
        .select(`
          id, 
          project_name,
          project_type,
          delivery_date,
          created,
          client_name,
          client:client_id(client_name)`)
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Error fetching project:", error);
      } else {
        setProject({
        ...data,
        client: data.client && data.client.length > 0 ? data.client[0].client_name : "Sin cliente"
      });

      }
    };

    // Función para obtener los assets de contenido
    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("id, url_media, media_type, created_at, project_id, media_use")
        .eq("project_id", id)
        .eq("media_use", "media"); // Filtrar solo assets de contenido

      if (error) {
        console.error("❌ Error fetching assets:", error);
      } else {
        setMediaAssets(data as Asset[]);
      }
    };

    // Ejecutar las funciones
    if (id) {
      fetchProject();
      fetchAssets();
    }
  }, [id]); // Ejecutar solo al cargar el componente

    // Si no hay proyecto, mostrar un mensaje
  if (!project) return <p className="text-center text-white">Cargando...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-white">{project.project_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {mediaAssets.map((asset) => (
          <div key={asset.id} className="w-full">
            {asset.media_type === "video" ? (
              <video controls className="w-full rounded-lg shadow-lg">
                <source src={asset.url_media} type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            ) : (
              <img
                src={asset.url_media}
                alt="Project asset"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
