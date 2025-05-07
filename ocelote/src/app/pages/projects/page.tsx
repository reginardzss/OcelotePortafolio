// /pages/projects/page.tsx
import BackToTopButton from "@/app/components/backToTop";
import ProjectList from "@/app/components/ProjectList";

export default function Projects() {
  return (
    <div>
      <div className="py-12 my-8">
        <div className="bg-oceloteRed w-full h-[30lvh] flex flex-col gap-4 py-12 justify-center items-center text-center">
          <span className="text-4xl">PROJECTS</span>
          <span className="text-xl font-light">Descripcion corta.</span>
        </div>
        <div className=" px-8">
          <ProjectList />
        </div>
        
      </div>
      <BackToTopButton/>
    </div>
  );
}
