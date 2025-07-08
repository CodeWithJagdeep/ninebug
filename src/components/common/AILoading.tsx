import React, { useRef, useEffect } from "react";

const AILoading: React.FC = () => {
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;

    if (!canvas1 || !canvas2) return;

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    if (!ctx1 || !ctx2) return;

    // Set canvas sizes
    canvas1.width = 100;
    canvas1.height = 100;
    canvas2.width = 80;
    canvas2.height = 80;

    // Draw diamond with gradient for larger icon
    const gradient1 = ctx1.createLinearGradient(50, 0, 50, 100);
    gradient1.addColorStop(0, "#4A90E2"); // Blue
    gradient1.addColorStop(1, "#F5A9B8"); // Pink
    ctx1.beginPath();
    ctx1.moveTo(50, 10);
    ctx1.lineTo(90, 50);
    ctx1.lineTo(50, 90);
    ctx1.lineTo(10, 50);
    ctx1.closePath();
    ctx1.fillStyle = gradient1;
    ctx1.fill();

    // Draw diamond with gradient for smaller icon
    const gradient2 = ctx2.createLinearGradient(40, 0, 40, 80);
    gradient2.addColorStop(0, "#4A90E2"); // Blue
    gradient2.addColorStop(1, "#F5A9B8"); // Pink
    ctx2.beginPath();
    ctx2.moveTo(40, 8);
    ctx2.lineTo(72, 40);
    ctx2.lineTo(40, 72);
    ctx2.lineTo(8, 40);
    ctx2.closePath();
    ctx2.fillStyle = gradient2;
    ctx2.fill();
  }, []);

  return (
    <div className="absolute inset-0 z-20 bg-black/90 gap-6 bg-opacity-70 flex items-center justify-center text-white font-semibold text-lg rounded-xl">
      <div className="relative flex items-center justify-center">
        {/* Rotating icon with inner gradient */}
        <div className="h-12 w-12 rounded-full animate-rotate-stepwise relative">
          <div className="absolute inset-0  bg-gradient-to-tr animate-rotate from-blue-400 via-purple-400 to-pink-400 opacity-40 blur-sm"></div>
          <div className="absolute inset-[4px] bg-gradient-to-br animate-rotate from-white/30 to-white/70 backdrop-blur-md"></div>
        </div>
      </div>
      <span className=" text-white">Evaluating your solution...</span>
    </div>
  );
};

export default AILoading;
