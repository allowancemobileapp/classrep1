
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppPlatforms } from "@/components/cosmic/app-platforms";
import { InteractiveScreenshot } from "@/components/cosmic/interactive-screenshot";
import { useState } from "react";
import WelcomeScreen from "@/components/cosmic/welcome-screen";
import { AnimatePresence } from "framer-motion";
import { Collaborators } from "@/components/cosmic/collaborators";
import { useFormState, useFormStatus } from "react-dom";
import { addToWaitlist } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

function WaitlistForm() {
  const [state, formAction] = useFormState(addToWaitlist, null);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
    } else if (state?.error) {
        const errorMessage = typeof state.message === 'object' 
        ? Object.values(state.message).flat().join(', ')
        : state.error;
      toast({
        title: "Oops!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <section
      id="waitlist"
      className="flex w-full flex-col items-center gap-6"
      aria-labelledby="waitlist-heading"
    >
      <h3
        id="waitlist-heading"
        className="font-headline text-3xl font-bold uppercase tracking-widest sm:text-4xl"
      >
        // Join The Mission
      </h3>
      <form action={formAction} className="flex w-full max-w-sm flex-col items-center gap-4">
        <Input
          type="text"
          name="name"
          placeholder="YOUR NAME"
          className="h-12 bg-background/50 text-center font-bold uppercase tracking-widest placeholder:text-muted-foreground/50"
          aria-label="Your Name"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="YOUR EMAIL"
          className="h-12 bg-background/50 text-center font-bold uppercase tracking-widest placeholder:text-muted-foreground/50"
          aria-label="Your Email"
          required
        />
        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full bg-primary font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-none button-glow"
          disabled={pending}
        >
          {pending ? "Joining..." : "Join The Waitlist - Free!"}
        </Button>
      </form>
    </section>
  );
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeDismiss = () => {
    setShowWelcome(false);
  };

  return (
    <>
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onDismiss={handleWelcomeDismiss} />}
      </AnimatePresence>
      <div className="flex min-h-screen flex-col items-center justify-center gap-24 overflow-hidden px-4 py-16 text-center">
        <header className="flex flex-col items-center gap-4">
          <Image
            src="https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/app_icon_foreground.png"
            alt="Official Logo"
            width={80}
            height={80}
            className="h-20 w-20"
          />
          <Image
            src="https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/WhatsApp_Image_2025-09-27_at_07.35.14_917f9077-removebg-preview.png"
            alt="Official App Name"
            width={300}
            height={50}
          />
        </header>

        <section
          id="hero"
          className="flex flex-col items-center gap-6"
          aria-labelledby="hero-heading"
        >
          <h2
            id="hero-heading"
            className="font-headline text-4xl font-bold uppercase tracking-widest sm:text-6xl md:text-7xl"
          >
            hurry, class don start!
          </h2>
          <p className="max-w-xl text-base text-foreground/80 sm:text-lg">
            Join the class, the fun and the excitement with your friends,
            families and colleagues. Tap and hold the icons below for 5 seconds
            to join the class
          </p>
          <AppPlatforms />
        </section>

        <InteractiveScreenshot />

        <Collaborators />

        <WaitlistForm />

        <footer className="mt-16">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Class-Rep. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
