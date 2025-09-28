
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface WelcomeScreenProps {
  onDismiss: () => void;
}

export default function WelcomeScreen({ onDismiss }: WelcomeScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/WhatsApp_Image_2025-09-27_at_07.35.14_917f9077-removebg-preview.png"
          alt="Class-Rep Logo"
          width={400}
          height={100}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
