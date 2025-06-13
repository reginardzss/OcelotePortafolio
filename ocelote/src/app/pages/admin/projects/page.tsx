"use client";
import { useState } from "react";
import ProjectList from "@/app/components/ProjectList";
import BackToTopButton from "@/app/components/backToTop";

export default function AdminProjectsPage() {
  const [step, setStep] = useState(1);

  const buttonBase = "px-4 md:px-0 py-4 lg:py-2 w-full h-full text-xl transition-colors duration-200";

  return (
    <div className="my-16">
      <div className="bg-oceloteRed w-full h-[30lvh] flex flex-col md:flex-row justify-evenly items-center text-center text-2xl">
        <button
          className={`${buttonBase} ${step === 2 ? "bg-white text-oceloteRed" : "text-white hover:text-oceloteRed hover:bg-white"}`}
          onClick={() => setStep(2)}
        >
          Comercial
        </button>
        <button
          className={`${buttonBase} ${step === 3 ? "bg-white text-oceloteRed" : "text-white hover:text-oceloteRed hover:bg-white"}`}
          onClick={() => setStep(3)}
        >
          Film
        </button>
        <button
          className={`${buttonBase} ${step === 4 ? "bg-white text-oceloteRed" : "text-white hover:text-oceloteRed hover:bg-white"}`}
          onClick={() => setStep(4)}
        >
          Photo
        </button>
      </div>

      {step === 1 && <div className="text-center m-5">Selecciona un tipo de proyecto</div>}
      {step === 2 && <ProjectList type="comercial" />}
      {step === 3 && <ProjectList type="film" />}
      {step === 4 && <ProjectList type="photo" />}

      <BackToTopButton />
    </div>
  );
}
