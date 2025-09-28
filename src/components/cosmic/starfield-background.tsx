"use client";

import { useState, useEffect } from "react";

const StarfieldBackground = () => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newStars: JSX.Element[] = [];
    const numStars = 200; // Adjust for more/less stars
    for (let i = 0; i < numStars; i++) {
      const size = Math.random() * 2 + 1;
      const style: React.CSSProperties = {
        position: "absolute",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "white",
        borderRadius: "50%",
        animationName: "move-star",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDuration: `${Math.random() * 50 + 50}s`, // Slower, varied speeds
        animationDelay: `-${Math.random() * 100}s`, // Start at random points
      };
      newStars.push(<div key={`star-${i}`} style={style} />);
    }
    setStars(newStars);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden bg-black">
      {stars}
    </div>
  );
};

export default StarfieldBackground;
