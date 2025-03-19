"use client";

export function IframeStyles() {
  return (
    <style jsx global>{`
      .prose iframe {
        width: 100%;
        aspect-ratio: 16/9;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        margin: 2rem 0;
      }
    `}</style>
  );
}