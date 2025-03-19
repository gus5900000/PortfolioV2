'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface HolographicImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function HolographicImage({ src, alt, width, height, className = '' }: HolographicImageProps) {
  // Initialize states
  const [hover, setHover] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle animation timeout
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!hover && !animated) {
      timeout = setTimeout(() => setAnimated(true), 500);
    }
    return () => clearTimeout(timeout);
  }, [hover, animated]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    setAnimated(false);
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card (in percentage)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Calculate LP and TP values for background
    const lp = 50 + (x - 50) / 1.5;
    const tp = 50 + (y - 50) / 1.5;
    
    // Calculate rotation values
    const rotX = ((y - 50) / 50) * 15; 
    const rotY = ((x - 50) / 50) * -15;
    
    setBackgroundPosition({ x: lp, y: tp });
    setRotation({ x: rotX, y: rotY });
  };

  // Only render basic component during SSR
  if (!isMounted) {
    return (
      <div className="relative w-[300px]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover object-top rounded-3xl ${className}`}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative w-[300px] perspective-[1200px]">
      <div 
        ref={cardRef}
        className={`relative w-full rounded-3xl overflow-hidden transform-gpu
          ${animated ? 'animate-card-reset' : ''}`}
        onMouseEnter={() => setHover(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHover(false);
          setRotation({ x: 0, y: 0 });
          setBackgroundPosition({ x: 50, y: 50 });
        }}
        style={{
          transform: hover 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: hover ? 'transform 0.1s ease' : 'transform 0.5s ease',
        }}
      >
        {/* Base image */}
        <div className="relative z-10">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`object-cover object-top rounded-3xl ${className}`}
            loading="lazy"
          />
        </div>
        
        {/* Holographic gradient overlay */}
        <div 
          className={`absolute inset-0 z-20 rounded-3xl mix-blend-color-dodge
            ${animated ? 'animate-holo-gradient' : ''}`}
          style={{
            opacity: hover ? 1 : 0.5,
            backgroundImage: `linear-gradient(
              115deg,
              transparent 0%,
              #dd45c0 25%,
              transparent 47%,
              transparent 53%,
              #dd45c0 75%,
              transparent 100%
            )`,
            backgroundPosition: hover 
              ? `${backgroundPosition.x}% ${backgroundPosition.y}%` 
              : '50% 50%',
            backgroundSize: '300% 300%',
            backgroundRepeat: 'no-repeat',
            transition: hover ? 'none' : 'all 1s ease'
          }}
        />
        
        {/* Sparkles and rainbow effect */}
        <div 
          className={`absolute inset-0 z-30 rounded-3xl mix-blend-color-dodge
            ${animated ? 'animate-holo-sparkle' : ''}`}
          style={{
            backgroundImage: `url('/sparkles.gif'),
              linear-gradient(
                125deg,
                rgba(255, 0, 132, 0.5) 15%,
                rgba(252, 164, 0, 0.4) 30%,
                rgba(255, 255, 0, 0.3) 40%,
                rgba(0, 255, 138, 0.2) 60%,
                rgba(0, 207, 255, 0.4) 70%,
                rgba(204, 76, 250, 0.5) 85%
              )`,
            backgroundSize: '180%',
            backgroundPosition: hover 
              ? `${backgroundPosition.x}% ${backgroundPosition.y}%` 
              : '50% 50%',
            opacity: hover ? 1 : 0.75,
            transition: hover ? 'none' : 'all 1s ease'
          }}
        />
        
        {/* Card styling - shadow effect */}
        <div 
          className="absolute inset-0 z-0 rounded-3xl"
          style={{
            boxShadow: hover 
              ? '-3px -3px 3px 0 rgba(38, 230, 247, 0.3), 3px 3px 3px 0 rgba(247, 89, 228, 0.3), 0 0 6px 2px rgba(255, 231, 89, 0.3), 0 35px 25px -15px rgba(0, 0, 0, 0.3)'
              : '-1px -1px 1px 0 rgba(38, 230, 247, 0.2), 1px 1px 1px 0 rgba(247, 89, 228, 0.2), 0 0 3px 1px rgba(255, 231, 89, 0.2), 0 20px 15px -10px rgba(0, 0, 0, 0.2)'
          }}
        />
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes holoSparkle {
          0%, 100% { opacity: .75; filter: brightness(1.2) contrast(1.25); }
          5%, 8% { opacity: 1; filter: brightness(.8) contrast(1.2); }
          13%, 16% { opacity: .5; filter: brightness(1.2) contrast(.8); }
          35%, 38% { opacity: 1; filter: brightness(1) contrast(1); }
          55% { opacity: .33; filter: brightness(1.2) contrast(1.25); }
        }

        @keyframes holoGradient {
          0%, 100% { opacity: 0.5; background-position: 50% 50%; filter: brightness(.5) contrast(1); }
          5%, 9% { background-position: 100% 100%; opacity: 1; filter: brightness(.75) contrast(1.25); }
          13%, 17% { background-position: 0% 0%; opacity: .88; }
          35%, 39% { background-position: 100% 100%; opacity: 1; filter: brightness(.5) contrast(1); }
          55% { background-position: 0% 0%; opacity: 1; filter: brightness(.75) contrast(1.25); }
        }

        @keyframes cardReset {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(0deg) rotateY(0deg); }
        }

        .animate-holo-sparkle { animation: holoSparkle 12s ease infinite; }
        .animate-holo-gradient { animation: holoGradient 12s ease infinite; }
        .animate-card-reset { animation: cardReset 1.5s ease; }
        
        .perspective-\\[1200px\\] {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
}