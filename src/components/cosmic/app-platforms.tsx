
"use client";

import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useRef, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.2 0 184.8 0 249.4c0 37.3 18.2 72.3 53.3 97.2 30.3 22.1 63.8 31.3 94.2 31.3 30.3 0 59.5-10.2 82.3-31.3 12.8-11.4 19.3-25.4 19.3-40.3.1-2.7-.1-5.4-.2-8.1zM224 435.3c33.8-21.8 63.8-49.5 77.3-81.8-13.3 10.3-29.2 15.6-45.6 15.6-34.5 0-63.8-19.7-77.3-19.7-16.2 0-35.5 13.5-45.6 19.7 20.8 45.1 52.8 71.3 96.9 81.9z" />
  </svg>
);

const AndroidIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M15.5 6.5C15.5 5.67 14.83 5 14 5C13.17 5 12.5 5.67 12.5 6.5C12.5 7.33 13.17 8 14 8C14.83 8 15.5 7.33 15.5 6.5ZM10 5C9.17 5 8.5 5.67 8.5 6.5C8.5 7.33 9.17 8 10 8C10.83 8 11.5 7.33 11.5 6.5C11.5 5.67 10.83 5 10 5ZM19 12L18.14 10.28C18.35 9.94 18.5 9.56 18.5 9.16C18.5 7.64 17.36 6.5 15.84 6.5C15.44 6.5 15.06 6.65 14.72 6.86L13.84 5.16C12.95 3.45 11.13 2.5 9.16 2.5C7.19 2.5 5.37 3.45 4.48 5.16L3.6 6.86C3.26 6.65 2.88 6.5 2.48 6.5C1.03 6.5 0 7.58 0 9C0 10.15 0.69 11.11 1.64 11.55L1.5 12V17H2.5V19H4.5V17H13.5V19H15.5V17H16.5V12L16.36 11.55C17.31 11.11 18 10.15 18 9C18 8.65 17.9 8.32 17.72 8.04L17.5 8.5L16.5 10.5V12H19ZM4.5 12V10.5H13.5V12H4.5Z" />
  </svg>
);

const HoldButton = ({
  onHold,
  onCancel,
  children,
}: {
  onHold: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const HOLD_DURATION = 5000;

  const startHolding = () => {
    setIsHolding(true);
    setProgress(0);

    timerRef.current = setTimeout(() => {
      onHold();
      reset();
    }, HOLD_DURATION);

    progressIntervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (progressIntervalRef.current)
            clearInterval(progressIntervalRef.current);
          return 100;
        }
        return p + 100 / (HOLD_DURATION / 100);
      });
    }, 100);
  };

  const reset = () => {
    setIsHolding(false);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const cancelHolding = () => {
    onCancel();
    reset();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div
      onMouseDown={startHolding}
      onMouseUp={cancelHolding}
      onTouchStart={startHolding}
      onTouchEnd={cancelHolding}
      className="relative"
    >
      {children}
      <div
        className={cn(
          "absolute inset-x-0 bottom-[-8px] transition-opacity duration-300",
          isHolding ? "opacity-100" : "opacity-0"
        )}
      >
        <Progress value={progress} className="h-1 bg-primary/50" />
      </div>
    </div>
  );
};

export function AppPlatforms() {
  const { toast } = useToast();

  const handleIosClick = () => {
    toast({
      title: "Coming Soon!",
      description: "The iOS app is under development. Stay tuned!",
    });
  };

  const handleAndroidDownload = () => {
    toast({
      title: "Download Started",
      description: "Hold tight, your download is starting...",
    });
    // Placeholder for actual download logic
    console.log("Downloading for Android...");
  };

    const handleAndroidCancel = () => {
    toast({
      title: "Download Cancelled",
      variant: "destructive",
    });
  };

  return (
    <TooltipProvider>
      <div className="mt-4 flex items-center justify-center gap-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleIosClick}
              className="group transform transition-transform hover:scale-110"
            >
              <AppleIcon className="h-10 w-10 text-foreground/80 transition-colors group-hover:text-primary" />
              <span className="sr-only">Download for iOS</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>iOS App (Coming Soon)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="group transform transition-transform hover:scale-110"
            >
              <Globe className="h-10 w-10 text-foreground/80 transition-colors group-hover:text-primary" />
              <span className="sr-only">Open Web App</span>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Web App</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <HoldButton onHold={handleAndroidDownload} onCancel={handleAndroidCancel}>
              <div className="group transform transition-transform hover:scale-110 cursor-pointer">
                <AndroidIcon className="h-10 w-10 text-foreground/80 transition-colors group-hover:text-primary" />
                <span className="sr-only">Download for Android</span>
              </div>
            </HoldButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Android App (Hold to download)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

    