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
      const { data, error } = await supabase.from("project").select("*");
      if (error) console.error("Error fetching projects:", error);
      else setProjects(data || []);
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
