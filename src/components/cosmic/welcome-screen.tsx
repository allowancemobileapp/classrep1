
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface WelcomeScreenProps {
  onDismiss: () => void;
}

export default function WelcomeScreen({ onDismiss }: WelcomeScreenProps) {
  const welcomeImage = PlaceHolderImages.find((p) => p.id === "welcome-background");

  if (!welcomeImage) {
    // Or a fallback
    onDismiss();
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black"
      onClick={onDismiss}
    >
      <Image
        src={welcomeImage.imageUrl}
        alt={welcomeImage.description}
        fill
        style={{ objectFit: 'cover' }}
        priority
        data-ai-hint={welcomeImage.imageHint}
      />
      <div className="relative z-10 text-center text-white">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-xl font-bold uppercase tracking-widest animate-pulse"
        >
          Tap anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
}
