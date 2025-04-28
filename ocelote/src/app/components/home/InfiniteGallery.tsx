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

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch('/api/assets?media_type=photo');
        const data = await res.json();

        // Mezclar las imágenes para que no estén juntas las del mismo proyecto
        const shuffled = data.sort(() => 0.5 - Math.random());
        setPhotos(shuffled);
      } catch (error) {
        console.error('Error fetching photos:', error);
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
