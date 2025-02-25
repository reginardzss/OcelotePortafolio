"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // 🔹 Para obtener el `id` de la URL
import { supabase } from "@/lib/supabase";

type Asset = {
  id: number;
  media_type: string;
  url_media: string;
};

type Project = {
  id: number;
  project_name: string;
  assets: Asset[];
};

export default function ProjectDetail() {
  const { id } = useParams(); // 🔹 Obtener el `id` de la URL
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("project")
        .select("id, project_name, assets:assets(url_media, media_type)")
        .eq("id", id) // 🔹 Filtrar por el ID dinámico
        .single(); // 🔹 Tomar solo un resultado

      if (error) {
        console.error("❌ Error fetching project:", error);
      } else {
        setProject(data);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (!project) return <p className="text-center text-white">Cargando...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-white">{project.project_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {project.assets.map((asset) => (
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
