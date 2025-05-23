import ProjectList from "@/app/components/ProjectList";
import BackToTopButton from "@/app/components/backToTop";

export default function PhotoProjectsPage() {
  return (
    <div className="my-20">
      <div className="bg-oceloteRed w-full h-[30lvh] flex flex-col gap-4 py-12 justify-center items-center text-center">
      <span className="text-2xl md:text-4xl uppercase">photo</span>
      <span className="text-l md:text-xl font-light">
          Series fotográficas artísticas y comerciales.
        </span>
      </div>

      <ProjectList type="photo" />
      <BackToTopButton />
    </div>
  );
}
