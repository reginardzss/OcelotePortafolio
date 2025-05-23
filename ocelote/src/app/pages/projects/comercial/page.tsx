import ProjectList from "@/app/components/ProjectList";
import BackToTopButton from "@/app/components/backToTop";

export default function ComercialProjectsPage() {
  return (
    <div className="my-16">
      <div className="bg-oceloteRed w-full h-[30lvh] flex flex-col gap-4 py-12 justify-center items-center text-center">
        <span className="text-2xl md:text-4xl uppercase">comercial</span>
        <span className="text-l md:text-xl font-light">
          Proyectos comerciales realizados para marcas y empresas.
        </span>
      </div>

      <ProjectList type="comercial" />
      <BackToTopButton />
    </div>
  );
}
