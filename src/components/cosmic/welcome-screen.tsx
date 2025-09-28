
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
    </motion.div>
  );
}
