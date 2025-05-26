// components/ProjectList.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Project, Asset } from "@/lib/types";
import ProjectPreview from "./projectPreview";

export default function ProjectList({ type }: { type?: string }) {
  const [projects, setProjects] = useState<Project[]>([]); // Estado para almacenar los proyectos

  useEffect(() => {
    const fetchProjects = async () => {
      let query = supabase
        .from("project")
        .select(`id, 
          project_name, 
          project_type, 
          created, 
          delivery_date, 
          client:client_id(id, client_name),
          assets:assets(url_media, media_use)
        `);
      
        if (type) {
          query = query.eq("project_type", type);
        }
        const { data, error } = await query;
      
      // Manejar errores
      if (error) {
        console.error("❌ Error fetching projects:", error);
      } else {
        // Transformar los datos
        const transformedData = data.map((project:any) => ({
          ...project, //Mantener todos los datos
          client_name: project.client ? project.client.client_name : "Sin cliente", // Obtener el nombre del cliente
          image_url: project.assets?.find((asset: Asset) => asset.media_use === "cover")?.url_media || "/assets/default.jpg" // Obtener solo la portada
        }));

        // Actualizar el estado
        setProjects(transformedData);
      }
    };
  
    fetchProjects(); // Ejecutar la función
  }, [type]);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pt-4">
      {projects.map((project) => (
        <ProjectPreview key={project.id} project={project} />
      ))}
    </div>
  );
}
