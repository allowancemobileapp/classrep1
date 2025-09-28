
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
import Image from "next/image";

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

  const showHoldInstruction = () => {
    toast({
      title: "Hold for 5 seconds to install",
    });
  };

  const handleIosClick = () => {
    toast({
      title: "Coming Soon!",
      description: "Hold for 5 seconds to install when available.",
    });
  };

  const handleAndroidDownload = () => {
    toast({
      title: "Download Started",
      description: "Hold tight, your download is starting...",
    });
    const link = document.createElement('a');
    link.href = 'https://github.com/allowancemobileapp/classrep/releases/download/v1.0.0/Class-Rep-v2.apk';
    link.setAttribute('download', 'Class-Rep-v2.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <Image 
                src="https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/ios.png" 
                alt="Download for iOS" 
                width={40} 
                height={40} 
                className="h-10 w-10" 
              />
              <span className="sr-only">Download for iOS</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>iOS App (Hold to install)</p>
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
            <HoldButton onHold={handleAndroidDownload} onCancel={showHoldInstruction}>
              <div className="group transform transition-transform hover:scale-110 cursor-pointer">
                <Image 
                  src="https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/Android.png" 
                  alt="Download for Android" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10" 
                />
                <span className="sr-only">Download for Android</span>
              </div>
            </HoldButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Android App (Hold to install)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
