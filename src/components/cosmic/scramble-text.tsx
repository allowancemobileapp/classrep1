"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type ScrambleTextProps = {
  children: string;
  className?: string;
};

const ScrambleText: React.FC<ScrambleTextProps> = ({
  children,
  className,
}) => {
  const [text, setText] = useState(children);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalText = children;
  const chars = "!<>-_\\/[]{}—=+*^?#";

  const scramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            if (letter === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setText(originalText);
      }

      iteration += 1 / 3;
    }, 30);
  }, [originalText]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(originalText);
  }, [originalText]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span onMouseEnter={scramble} onMouseLeave={stopScramble} className={className}>
      {text}
    </span>
  );
};

export default ScrambleText;
