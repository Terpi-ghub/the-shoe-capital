'use client';

import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface ImageCarouselProps {
  images: any[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Render a single image if there's only one
  if (images.length === 1) {
    return (
      <div className="mb-14 rounded-2xl overflow-hidden shadow-2xl border-b-4 border-[#FFD700] group relative">
        <img
          src={urlFor(images[0]).width(1200).height(675).url()}
          alt={alt}
          className="w-full h-auto max-h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    );
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-14 rounded-2xl overflow-hidden shadow-2xl border-b-4 border-[#FFD700] relative group bg-black select-none">
      {/* Main Slide */}
      <div className="relative w-full h-[350px] sm:h-[480px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={urlFor(images[currentIndex]).width(1200).height(675).url()}
          alt={`${alt} - Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#800000] text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm group-hover:opacity-100 opacity-80"
        aria-label="Previous Image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#800000] text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm group-hover:opacity-100 opacity-80"
        aria-label="Next Image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-[#FFD700]' : 'w-2.5 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>

      {/* Counter Badge */}
      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md uppercase tracking-wider">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}