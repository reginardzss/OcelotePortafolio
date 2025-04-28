'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const images = [
    '/assets/hp-carousel-4.png',
    '/assets/hp-carousel-3.png',
    '/assets/hp-carousel-2.png',
    '/assets/hp-carousel-1.png',
  ];

const HomeSectionTwo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5, //50% del carrusle visible para activarlo
            }
        );
        if(carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => {
            if(carouselRef.current){
                observer.unobserve(carouselRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if(isVisible) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            },2500);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <div ref={carouselRef} className="w-full h-[300px] md:h-[500px] lg:h-[600px] bg-[#E0E0E0] flex items-center justify-center overflow-hidden relative">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                width={2000}
                height={1000}
                className="object-cover w-full h-full"
                priority={index === 0} // Solo la primera imagen con prioridad
              />
            </div>
          ))}
        </div>
      );
    };
    
    export default HomeSectionTwo;