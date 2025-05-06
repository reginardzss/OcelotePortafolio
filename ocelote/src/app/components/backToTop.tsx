'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 size-12 md:size-16 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
      aria-label="Back to top"
    >
      <ChevronUp className="size-6 md:size-8" />
    </button>
  );
};

export default BackToTopButton;
