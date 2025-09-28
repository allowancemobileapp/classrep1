import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AppPlatforms } from "@/components/cosmic/app-platforms";

export default function Home() {
  const appScreenshot = PlaceHolderImages.find(p => p.id === 'app-screenshot');

  return (
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
          className="font-headline text-4xl font-bold uppercase tracking-widest text-glow sm:text-6xl md:text-7xl"
        >
          // YOUR TIMETABLE, EVOLVED
        </h2>
        <p className="max-w-xl text-base text-foreground/80 sm:text-lg">
          Organize your academic life. Share timetables with your entire class.
          Get rewarded. Welcome to the future of student collaboration.
        </p>
        <AppPlatforms />
      </section>

      {appScreenshot && (
         <section id="screenshot" aria-label="App Screenshot">
           <div className="rounded-2xl border border-primary/50 bg-black p-1 shadow-lg border-glow">
             <div className="rounded-xl border-2 border-black">
                <Image
                    src={appScreenshot.imageUrl}
                    alt={appScreenshot.description}
                    width={300}
                    height={600}
                    className="rounded-lg"
                    data-ai-hint={appScreenshot.imageHint}
                />
             </div>
           </div>
         </section>
      )}

      <section
        id="waitlist"
        className="flex w-full flex-col items-center gap-6"
        aria-labelledby="waitlist-heading"
      >
        <h3 id="waitlist-heading" className="font-headline text-3xl font-bold uppercase tracking-widest sm:text-4xl">
          // Join The Mission
        </h3>
        <form className="flex w-full max-w-sm flex-col items-center gap-4">
          <Input
            type="text"
            placeholder="YOUR NAME"
            className="h-12 bg-background/50 text-center font-bold uppercase tracking-widest placeholder:text-muted-foreground/50"
            aria-label="Your Name"
          />
          <Input
            type="email"
            placeholder="YOUR EMAIL"
            className="h-12 bg-background/50 text-center font-bold uppercase tracking-widest placeholder:text-muted-foreground/50"
            aria-label="Your Email"
          />
          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full bg-primary font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-none button-glow"
          >
            Join The Waitlist - Free!
          </Button>
        </form>
      </section>

      <footer className="mt-16">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Class-Rep. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
