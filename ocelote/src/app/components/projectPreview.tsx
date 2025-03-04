// components/ProjectPreview.tsx
"use client";

import Image from "next/image";
import { Project } from "@/lib/types";
import Link from "next/link";

// Definir las propiedades
type Props = {
  project: Project;
};

const ProjectPreview: React.FC<Props> = ({ project }) => {
  const year = new Date(project.delivery_date).getFullYear(); // Extraer el año

  return (
    <div className="flex flex-col items-center w-fit">
      <Link href={`/pages/detail/${project.id}`}>
      <div className="p-4">
        <Image
          src={project.image_url || "/assets/default.jpg"} // Imagen por defecto si no hay portada
          height={300}
          width={500}
          alt={project.project_name}
        />
      </div>
      <div className="font-medium text-center text-lg">
        <div className="text-white">{project.project_name} - {project.client?.client_name }</div>
        <div className="text-gray-300">{year}</div>
      </div>
      </Link>
    </div>
  );
};

export default ProjectPreview;
