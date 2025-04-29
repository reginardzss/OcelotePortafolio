'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const HomeCarousel = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simula la carga desde AWS (reemplaza esto con tu fetch real)
  useEffect(() => {
    const fetchImages = async () => {
      const awsImages = [
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-4.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-3.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-2.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-1.png',
      ];
      setImages(awsImages);
    };

    fetchImages();
  }, []);

  // Detectar visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  // Cambiar imágenes automáticamente
  useEffect(() => {
    if (isVisible && images.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, images]);

  const goToPrevious = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToIndex = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(index);
  };

  return (
    <div ref={carouselRef} className="w-full h-[500px] flex flex-col items-center justify-center relative overflow-hidden bg-[#E0E0E0] p-4">
      <div className="w-full h-full relative">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Carousel image ${index + 1}`}
              width={1200}
              height={800}
              className="object-cover w-full h-full"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Controles de navegación */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ›
        </button>
      </div>
      
      {/* Puntitos abajo */}
      <div className="flex space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-oceloteRed' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
