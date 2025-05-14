"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Project, Asset } from "@/lib/types";
import Image from "next/image";
import useIsMobile from "@/app/hooks/useIsMobile";
import BackToTopButton from "@/app/components/backToTop";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [mediaAssets, setMediaAssets] = useState<Asset[]>([]);
  const [coverAsset, setCoverAsset] = useState<Asset | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("project")
        .select(`
          id, 
          project_name,
          project_type,
          delivery_date,
          created,
          client:client_id(id, client_name)
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Error fetching project:", error);
      } else {
        const project = {
          ...data,
          client: Array.isArray(data.client) ? data.client[0] : data.client
        };
        setProject(project);
      }
    };

    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("id, url_media, media_type, created_at, project_id, media_use")
        .eq("project_id", id)
        .eq("media_use", "media");

      if (error) {
        console.error("❌ Error fetching assets:", error);
      } else {
        setMediaAssets(data as Asset[]);
      }
    };

    const fetchCover = async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("*")
        .eq("project_id", id)
        .eq("media_use", "cover")
        .single();

      if (error) {
        console.error("❌ Error fetching cover asset:", error);
      } else {
        setCoverAsset(data as Asset);
      }
    };

    if (id) {
      fetchProject();
      fetchAssets();
      fetchCover();
    }
  }, [id]);

  if (!project) return <p className="text-center text-white">Cargando...</p>;

  const year = new Date(project.delivery_date).getFullYear();

  return (
    <div className="my-20">
      <section>
        {isMobile ? (
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-xl">{project.project_name}</h1>
            <h2 className="text-l font-normal">{project.client?.client_name} - {year}</h2>
          </div>
        ) : (
          <div className="w-full h-[50lvh] flex items-center justify-center overflow-hidden relative">
            {coverAsset ? (
              <Image
                src={coverAsset.url_media}
                alt="Portada del proyecto"
                width={2000}
                height={2000}
                className="w-full h-full object-cover"
                placeholder="empty"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-500" />
            )}
            <div className="absolute w-full h-[50lvh] bg-black opacity-50"></div>
            <div className="absolute w-full h-auto items-center">
              <div className="flex flex-col p-16 2xl:p-64 text-center gap-4 text-white">
                <h1 className="text-xl md:text-2xl lg:text-4xl">{project.project_name}</h1>
                <h2 className="text-l md:text-xl lg:text-2xl font-normal">{project.client?.client_name} - {year}</h2>
                <p className="font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="m-8">
        <div className="h-auto w-full flex justify-center items-center">
          {mediaAssets.map((asset) => (
            <div key={asset.id}>
              {asset.media_type === "video" && (
                <video controls className="w-[75lvw] rounded-lg shadow-lg">
                  <source src={asset.url_media} type="video/mp4" />
                  Tu navegador no soporta videos.
                </video>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {mediaAssets.map((asset) => (
            <div key={asset.id}>
              {asset.media_type !== "video" && (
                <img
                  src={asset.url_media}
                  alt="Project asset"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <BackToTopButton />
    </div>
  );
}
