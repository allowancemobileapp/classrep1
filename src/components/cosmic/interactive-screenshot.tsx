
"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const screenshotImages = [
  "get-started",
  "tap-anywhere",
  "screenshot-1",
  "screenshot-2",
  "screenshot-3",
  "screenshot-4",
  "screenshot-5",
  "screenshot-6",
].map(id => PlaceHolderImages.find((p) => p.id === id)).filter(Boolean);

export function InteractiveScreenshot() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshotImages.length);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);
    return () => clearInterval(intervalId);
  }, [nextImage]);

  const handleTap = () => {
    nextImage();
  };

  const currentImage = screenshotImages[currentIndex];

  if (!currentImage) {
    return null;
  }

  return (
    <section id="screenshot" aria-label="App Screenshot">
      <div className="relative mx-auto h-[600px] w-[300px] cursor-pointer rounded-[40px] border-[14px] border-black bg-black shadow-lg border-glow overflow-hidden" onClick={handleTap}>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-20 bg-black rounded-r-md z-20"></div>
        <div className="absolute top-1/3 -translate-y-1/2 right-0 w-1 h-12 bg-black rounded-l-md z-20"></div>
         <div className="absolute top-[calc(1/3+4rem)] -translate-y-1/2 right-0 w-1 h-12 bg-black rounded-l-md z-20"></div>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className="w-full h-full"
          >
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.description}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-[26px]"
              data-ai-hint={currentImage.imageHint}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
