
import Link from "next/link";
import Image from "next/image";

const ProjectPreview: React.FC = () => {
  return (
    <div className="p-4">
      <Link href="/">
        <div className="cursor-pointer">
          <Image
            src="/assets/still-ejemplo.jpg"
            height={200} // Ajusta el tamaño según necesites
            width={300}
            alt="Ejemplo Preview"
          />
          <div className="mt-2 text-lg font-semibold text-white">
            Colegio Bilingüe Salvador Novo
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectPreview;
