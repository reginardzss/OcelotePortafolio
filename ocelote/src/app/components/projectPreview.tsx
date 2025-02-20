// components/ProjectPreview.tsx
import Image from "next/image";
import { Project } from "@/lib/types";
import Link from "next/link";

type Props = {
  project: Project;
};

const ProjectPreview: React.FC<Props> = ({ project }) => {
  const year = new Date(project.deliveryDate).getFullYear(); // Extraer el año

  return (
    <div className="flex flex-col items-center w-fit">
      <Link href="/">
      <Image
        src="/assets/still-ejemplo.jpg" // Reemplázalo con una URL real
        height={200}
        width={300}
        alt={project.name}
      />
      <div className="font-medium text-center">
        <div className="text-white">{project.name} - {project.client}</div>
        <div className="text-gray-300">{year}</div>
      </div>
      </Link>
    </div>
  );
};

export default ProjectPreview;
