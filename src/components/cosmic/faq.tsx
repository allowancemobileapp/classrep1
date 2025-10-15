
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "wtf is class-rep🤷‍♀️!?",
    answer:
      "It's a productive social media app for humans. Like if X and Instagram had a baby and it's freaking cool",
  },
  {
    question: "why isn't it on the play store or app store?? kinder weird🤨",
    answer:
      "we couldn't raise enough capital to pay the annual app store developer fee of $100 and for some reason, google just won't verify our account on time but the team is working hard to get them on the stores for easy access hopefully before mid november",
  },
  {
    question: "what's the N5h monthly sub for?👀",
    answer:
      "cloud resources and profit, duhh! and we pay users who have a lot of subscribers too. dedicated users cash out with us!",
  },
  {
    question: "who created class-rep!?",
    answer: "mr James",
  },
  {
    question: "fu<k is that??",
    answer: "you'll know soon",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="w-full max-w-2xl"
      aria-labelledby="faq-heading"
    >
      <h3
        id="faq-heading"
        className="mb-8 text-center font-headline text-3xl font-bold uppercase tracking-widest sm:text-4xl"
      >
        // F.A.Q
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-primary/20"
          >
            <AccordionTrigger className="text-left font-headline text-lg font-bold uppercase tracking-wider text-primary/90 hover:text-primary hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-left text-base text-foreground/80">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
