"use client";

import { useState, useEffect } from "react";

const UfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.01 2.02c-5.5 0-10 4.48-10 10 0 1.54.35 2.98.97 4.29l.12.26.2.42c.86 1.73 2.63 2.94 4.7 3.49l.39.1c1.23.3 2.53.45 3.86.45s2.63-.15 3.86-.45l.39-.1c2.07-.55 3.84-1.76 4.7-3.49l.2-.42.12-.26c.62-1.31.97-2.75.97-4.29 0-5.52-4.5-10-10.01-10zM12 19c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
    <path d="M12 10c-2.76 0-5 2.24-5 5h10c0-2.76-2.24-5-5-5z" opacity=".4" />
  </svg>
);

const PlanetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="32" cy="32" r="14" />
    <ellipse cx="32" cy="32" rx="28" ry="8" />
  </svg>
);

const elements = [
  { Icon: UfoIcon, className: "w-16 h-16 text-primary" },
  { Icon: PlanetIcon, className: "w-12 h-12 text-primary/70" },
  { Icon: UfoIcon, className: "w-8 h-8 text-primary/50" },
  { Icon: PlanetIcon, className: "w-20 h-20 text-primary/60 opacity-50" },
];

interface FloatingElement {
  id: number;
  component: JSX.Element;
  style: React.CSSProperties;
}

const CosmicElements = () => {
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(
    []
  );
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const newElements = elements.map((El, i) => {
      return {
        id: i,
        component: <El.Icon className={El.className} />,
        style: {
          position: "absolute",
          top: `${20 + Math.random() * 60}%`,
          left: `${10 + Math.random() * 80}%`,
          animation: `float ${6 + Math.random() * 8}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        },
      };
    });
    setFloatingElements(newElements);
  }, []);

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full -z-1 pointer-events-none"
      style={{ transform: `translateY(${offsetY * 0.2}px)` }}
    >
      {floatingElements.map(({ id, component, style }) => (
        <div key={id} style={style}>
          {component}
        </div>
      ))}
    </div>
  );
};

export default CosmicElements;
