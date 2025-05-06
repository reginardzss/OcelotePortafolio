'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return isMobile;
}


export default function HomeSectionTwo() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  

  // Simula la carga desde AWS (reemplaza esto con tu fetch real)
  useEffect(() => {
    const fetchImages = async () => {
      const webImages = [
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-1-WEB.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-2-WEB.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-3-WEB.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-4-WEB.png',
        
      ];
      const mobileImages = [
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-1-MOVIL.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-2-MOVIL.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-3-MOVIL.png',
        'https://ocelote-archive.s3.us-east-2.amazonaws.com/wp-assets/hp-carousel-4-MOVIL.png',
      ];
      setImages(isMobile ? mobileImages : webImages);
    };

    fetchImages();
  }, [isMobile]);

  // Visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  // Reproduce automáticamente si visible
  useEffect(() => {
    if (isVisible && images.length > 0) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isVisible, images]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const restartAutoPlayLater = () => {
    stopAutoPlay();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      startAutoPlay();
    }, 2000); // 5 segundos de inactividad
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    restartAutoPlayLater();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    restartAutoPlayLater();
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    restartAutoPlayLater();
  };


  return (
    <div ref={carouselRef} className="w-full h-[500px] flex flex-col items-center justify-center relative overflow-hidden bg-[#E0E0E0] p-8">
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
        {/* Botones */}
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

      {/* Puntitos */}
      <div className="flex space-x-2 mt-4 z-5">
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

//export default HomeCarousel;