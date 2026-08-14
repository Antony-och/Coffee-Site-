import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/companyData';
import { PageView } from '../types';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSlideshowProps {
  setCurrentPage: (page: PageView) => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div className="relative w-full h-[600px] sm:h-[680px] lg:h-[720px] bg-[#2D241E] text-white overflow-hidden select-none border-b border-[#E5E1DA]/20">
      
      {/* Background Slide Image with Crossfade */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            referrerPolicy="no-referrer"
          />
          {/* Earthy Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D241E]/95 via-[#2D241E]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E] via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Slide Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5D6D3C] border border-[#D4C3A3]/40 text-[#FAF7F2] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF7F2] leading-tight tracking-wide drop-shadow-md">
            {currentSlide.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-[#D4C3A3] text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-xl drop-shadow">
            {currentSlide.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                setCurrentPage(currentSlide.primaryCtaAction);
                const el = document.getElementById(currentSlide.primaryCtaAction);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-sm tracking-wide shadow-xl flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{currentSlide.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentPage(currentSlide.secondaryCtaAction);
                const el = document.getElementById(currentSlide.secondaryCtaAction);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#D4C3A3]/40 backdrop-blur-md text-[#FAF7F2] font-semibold text-sm tracking-wide transition-all shadow"
            >
              {currentSlide.secondaryCtaText}
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-4 sm:right-8 lg:right-12 z-30 flex items-center gap-4 bg-[#2D241E]/80 border border-[#E5E1DA]/30 backdrop-blur-md p-2 rounded-2xl shadow-2xl">
        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-xl hover:bg-white/10 text-[#D97706] transition-colors"
          title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Prev */}
        <button
          onClick={prevSlide}
          className="p-2 rounded-xl hover:bg-white/10 text-[#FAF7F2] transition-colors"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2 px-1">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[#D97706]' : 'w-2 bg-[#D4C3A3]/40 hover:bg-[#D4C3A3]/70'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="p-2 rounded-xl hover:bg-white/10 text-[#FAF7F2] transition-colors"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Counter Indicator */}
      <div className="absolute bottom-8 left-4 sm:left-8 z-30 hidden md:flex items-center gap-2 text-xs font-semibold text-[#D4C3A3] bg-[#2D241E]/80 border border-[#E5E1DA]/20 px-3 py-1.5 rounded-full backdrop-blur-md">
        <span className="text-[#D97706] font-bold">0{currentIndex + 1}</span>
        <span>/</span>
        <span>0{HERO_SLIDES.length}</span>
        <span className="mx-2 text-[#D4C3A3]/40">•</span>
        <span className="text-[#FAF7F2]">{currentSlide.subtitle}</span>
      </div>

    </div>
  );
};
