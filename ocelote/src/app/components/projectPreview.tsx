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
    <div className="flex flex-col items-center justify-end w-full h-full">
      <Link href={`/pages/detail/${project.id}`}>
      <div className="p-4 h-auto xl:h-[50lvh] overflow-hidden">
        <Image
          src={project.image_url || "/assets/default.jpg"} // Imagen por defecto si no hay portada
          height={800}
          width={800}
          alt={project.project_name}
        />
      </div>
      <div className=" py-0 lg:py-6 text-center md:text-lg 2xl:text-xl">
        <h1 className=" text-white font-normal">{project.project_name} - {project.client?.client_name }</h1>
        <h2 className="text-gray-300 font-light">{year}</h2>
      </div>
      </Link>
    </div>
  );
};

export default ProjectPreview;
