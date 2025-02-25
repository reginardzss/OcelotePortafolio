// components/ProjectList.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/lib/types";
import ProjectPreview from "./projectPreview";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("project")
        .select(`id, 
          project_name, 
          project_type, 
          created, delivery_date, 
          client:client_id(id, client_name),
          assets:assets(url_media, media_use)
          `);
  
      console.log("🔍 Datos recibidos de Supabase:", data);
  
      if (error) {
        console.error("❌ Error fetching projects:", error);
      } else {
        // 🔹 Asegurar que `client` sea un objeto único en lugar de un array

        const transformedData = data.map((project:any) => ({
          ...project,
          client_name: project.client ? project.client.client_name : "Sin cliente",
          image_url: project.assets?.find(asset => asset.media_use === "cover")?.url_media || "/assets/default.jpg" // ✅ Obtener solo la portada
        }));

        console.log("🔍 Datos transformados:", transformedData);
        setProjects(transformedData);
      }
    };
  
    fetchProjects();
  }, []);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      {projects.map((project) => (
        <ProjectPreview key={project.id} project={project} />
      ))}
    </div>
  );
}
