
import Image from "next/image";

const collaborators = [
  {
    imageUrl:
      "https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/partyanimal.png",
    handle: "@partyanimal",
    name: "Party Animal",
    description: "all party updates and events",
  },
  {
    imageUrl:
      "https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/sportyanimal.png",
    handle: "@sportyanimal",
    name: "Sporty Animal",
    description: "free tickets and sporty bet updates",
  },
  {
    imageUrl:
      "https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/soundanimal.png",
    handle: "@soundanimal",
    name: "Sound Animal",
    description: "back to back music and podcast updates",
  },
];

export function Collaborators() {
  return (
    <section
      id="collaborators"
      className="flex w-full flex-col items-center gap-8"
      aria-labelledby="collaborators-heading"
    >
      <h3
        id="collaborators-heading"
        className="font-headline text-3xl font-bold uppercase tracking-widest sm:text-4xl"
      >
        Popular Accounts on Class-Rep
      </h3>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {[...collaborators, ...collaborators, ...collaborators, ...collaborators].map((collab, index) => (
            <div
              key={`${collab.handle}-${index}`}
              className="mx-6 flex flex-col items-center gap-3 text-center"
            >
              <Image
                src={collab.imageUrl}
                alt={collab.name}
                width={144}
                height={144}
                className="h-36 w-36 rounded-md border-2 border-primary/50 object-cover"
                data-ai-hint="person avatar"
              />
              <p className="w-32 text-base font-medium tracking-wide text-foreground/90">
                {collab.handle}
              </p>
              <p className="w-36 text-xs text-muted-foreground">
                {collab.description}
              </p>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </section>
  );
}
