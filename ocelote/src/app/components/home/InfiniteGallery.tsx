//ocelote/src/app/components/home/InfiniteGallery.tsx 

'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Asset = {
  id: number;
  url_media: string;
  project_id: number;
};

const InfiniteGallery = () => {
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch('/api/assets?media_type=photo');
        const data = await res.json();
        // Mezclar las imágenes para que no estén juntas las del mismo proyecto
        const shuffled = data.sort(() => 0.5 - Math.random());

        setPhotos(shuffled);

        //Preload de imagenes
        const preloadImages = shuffled.map((photo: { url_media: any; }) => {
          return new Promise<void>((resolve) =>{
            const img = document.createElement('img');
            img.src = photo.url_media;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        });

        await Promise.all(preloadImages);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const repeats = 5; // Número de repeticiones virtuales (ajustable)

  return (
    <div className="w-full relative overflow-hidden py-10">
      <div className="columns-2 sm:columns-3 md:columns-4 gap-2 px-4 animate-slide-scroll space-y-2">
        {Array.from({ length: repeats }).flatMap((_, i) =>
          photos.map((photo) => (
            <div key={`${photo.id}-${i}`} className="break-inside-avoid">
              <Image
                src={photo.url_media}
                alt={`Project ${photo.project_id}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InfiniteGallery;
