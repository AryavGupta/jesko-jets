"use client";

import { useEffect, useRef, useState } from "react";

interface PreloaderResult {
  images: HTMLImageElement[];
  progress: number;
  isLoaded: boolean;
}

export function useImagePreloader(
  sequencePath: string,
  frameCount: number
): PreloaderResult {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, "0");
      img.src = `${sequencePath}/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const p = loadedCount / frameCount;
        setProgress(p);
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        const p = loadedCount / frameCount;
        setProgress(p);
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      images[i] = img;
    }

    imagesRef.current = images;
  }, [sequencePath, frameCount]);

  return { images: imagesRef.current, progress, isLoaded };
}
