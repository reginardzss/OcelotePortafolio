import ProjectList from "@/app/components/ProjectList";
import BackToTopButton from "@/app/components/backToTop";

export default function FilmProjectsPage() {
  return (
    <div className="my-16">
      <div className="bg-oceloteRed w-full h-[30lvh] flex flex-col gap-4 py-12 justify-center items-center text-center">
        <span className="text-4xl uppercase">film</span>
        <span className="text-xl font-light">
          Cortometrajes y piezas narrativas desarrolladas por Ocelote.
        </span>
      </div>

      <ProjectList type="film" />
      <BackToTopButton />
    </div>
  );
}
