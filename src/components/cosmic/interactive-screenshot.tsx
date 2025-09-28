"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const screenshotImages = [
  PlaceHolderImages.find((p) => p.id === "get-started"),
  PlaceHolderImages.find((p) => p.id === "tap-anywhere"),
].filter(Boolean);

export function InteractiveScreenshot() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTap = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshotImages.length);
  };

  const currentImage = screenshotImages[currentIndex];

  if (!currentImage) {
    return null;
  }

  return (
    <section id="screenshot" aria-label="App Screenshot">
      <div className="relative mx-auto h-[600px] w-[300px] cursor-pointer rounded-[40px] border-[14px] border-black bg-black shadow-lg border-glow overflow-hidden" onClick={handleTap}>
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-lg z-20"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-20 bg-black rounded-r-md z-20"></div>
        <div className="absolute top-1/3 -translate-y-1/2 right-0 w-1 h-12 bg-black rounded-l-md z-20"></div>
         <div className="absolute top-[calc(1/3+4rem)] -translate-y-1/2 right-0 w-1 h-12 bg-black rounded-l-md z-20"></div>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
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
