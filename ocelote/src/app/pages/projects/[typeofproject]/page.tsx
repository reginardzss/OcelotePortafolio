//ocelote/src/app/pages/[typeofproject]/page.tsx
import { notFound } from "next/navigation";
import ProjectList from "@/app/components/ProjectList";
import BackToTopButton from "@/app/components/backToTop";
import * as React from 'react'

const descriptions: Record<string, string> = {
  comercial: "Proyectos comerciales realizados para marcas y empresas.",
  film: "Cortometrajes y piezas narrativas desarrolladas por Ocelote.",
  photo: "Series fotográficas artísticas y comerciales.",
};

export async function generateStaticParams() {
  return [
    { typeofproject: "comercial" },
    { typeofproject: "film" },
    { typeofproject: "photo" },
  ];
}


export default async function ProjectTypePage({ params }: { params: { typeofproject: string } }) {
    const { typeofproject } = params;

  if (!["comercial", "film", "photo"].includes(typeofproject)) {
    notFound();
  }

  return (
    <div>
      <div className="bg-oceloteRed w-full h-[30lvh] flex flex-col gap-4 py-12 justify-center items-center text-center">
        <span className="text-4xl uppercase">{typeofproject}</span>
        <span className="text-xl font-light">{descriptions[typeofproject]}</span>
      </div>

      <ProjectList type={typeofproject} />
      <BackToTopButton />
    </div>
  );
}
