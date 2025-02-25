"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Project, Asset } from "@/lib/types";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [mediaAssets, setMediaAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("project")
        .select("id, project_name")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Error fetching project:", error);
      } else {
        setProject(data);
      }
    };

    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("id, url_media, media_type")
        .eq("project_id", id)
        .eq("media_use", "media"); // ✅ Filtrar solo assets de contenido

      if (error) {
        console.error("❌ Error fetching assets:", error);
      } else {
        setMediaAssets(data);
      }
    };

    if (id) {
      fetchProject();
      fetchAssets();
    }
  }, [id]);

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
