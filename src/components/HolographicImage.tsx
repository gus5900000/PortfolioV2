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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card (in percentage)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    // Calculate rotation values
    const rotX = ((y - 50) / 50) * 15; 
    const rotY = ((x - 50) / 50) * -15;
    
    setRotation({ x: rotX, y: rotY });
  };

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
        className="relative w-full rounded-3xl overflow-hidden transform-gpu"
        onMouseEnter={() => setHover(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHover(false);
          setRotation({ x: 0, y: 0 });
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

        .perspective-\\[1200px\\] {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
}