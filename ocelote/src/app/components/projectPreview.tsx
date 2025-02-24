// components/ProjectPreview.tsx
import Image from "next/image";
import { Project } from "@/lib/types";
import Link from "next/link";

type Props = {
  project: Project;
};

const ProjectPreview: React.FC<Props> = ({ project }) => {
  const year = new Date(project.delivery_date).getFullYear(); // Extraer el año
  console.log("Project data:", project);

  return (
    <div className="flex flex-col items-center w-fit">
      <Link href="/">
      <Image
        src="/assets/still-ejemplo.jpg" // Reemplázalo con una URL real
        height={200}
        width={300}
        alt={project.project_name}
      />
      <div className="font-medium text-center">
        <div className="text-white">{project.project_name} - {project.client.client_name }</div>
        <div className="text-gray-300">{year}</div>
      </div>
      </Link>
    </div>
  );
};

export default ProjectPreview;
