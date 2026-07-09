"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  label: string;
  size: number;
  pulse: number;
};

type Connection = {
  from: number;
  to: number;
  progress: number[];
  speed: number[];
};

export function LogisticsNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Define relative positions for nodes (0 to 1 scale)
    const relativeNodes = [
      { rx: 0.22, ry: 0.32, label: "Brussels" },
      { rx: 0.32, ry: 0.52, label: "Milan" },
      { rx: 0.42, ry: 0.68, label: "Mundra" },
      { rx: 0.58, ry: 0.72, label: "Mumbai" },
      { rx: 0.72, ry: 0.74, label: "Singapore" },
      { rx: 0.78, ry: 0.54, label: "Vietnam" },
      { rx: 0.85, ry: 0.35, label: "Tokyo" },
    ];

    let nodes: (Node & { originalX: number; originalY: number })[] = [];
    let connections: Connection[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width * window.devicePixelRatio;
      height = rect.height * window.devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const w = rect.width;
      const h = rect.height;

      nodes = relativeNodes.map((rn) => ({
        x: rn.rx * w,
        y: rn.ry * h,
        originalX: rn.rx * w,
        originalY: rn.ry * h,
        label: rn.label,
        size: 5,
        pulse: Math.random() * Math.PI,
      }));

      connections = [
        { from: 0, to: 1, progress: [0.1, 0.4, 0.7], speed: [0.002, 0.003, 0.0015] },
        { from: 1, to: 2, progress: [0.2, 0.6], speed: [0.003, 0.004] },
        { from: 2, to: 3, progress: [0.0, 0.5], speed: [0.005, 0.004] },
        { from: 3, to: 4, progress: [0.3, 0.8], speed: [0.004, 0.003] },
        { from: 4, to: 5, progress: [0.1, 0.5, 0.9], speed: [0.003, 0.002, 0.0045] },
        { from: 5, to: 6, progress: [0.2, 0.7], speed: [0.002, 0.0035] },
        // Interconnections
        { from: 3, to: 0, progress: [0.1, 0.6], speed: [0.0015, 0.002] },
        { from: 3, to: 6, progress: [0.2, 0.8], speed: [0.0025, 0.002] },
        { from: 2, to: 5, progress: [0.4], speed: [0.003] },
      ];
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Physics
      nodes.forEach((node) => {
        const dx = mouse.x - node.originalX;
        const dy = mouse.y - node.originalY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = ((120 - dist) / 120) * 10;
          node.x = node.originalX + (dx / dist) * force;
          node.y = node.originalY + (dy / dist) * force;
        } else {
          node.x += (node.originalX - node.x) * 0.08;
          node.y += (node.originalY - node.y) * 0.08;
        }

        node.pulse += 0.015;
      });

      // Connections
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from]!;
        const toNode = nodes[conn.to]!;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = "rgba(203, 90, 36, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        conn.progress.forEach((p, idx) => {
          let nextP = p + conn.speed[idx]!;
          if (nextP > 1) {
            nextP = 0;
          }
          conn.progress[idx] = nextP;

          const px = fromNode.x + (toNode.x - fromNode.x) * nextP;
          const py = fromNode.y + (toNode.y - fromNode.y) * nextP;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#cb5a24";
          ctx.shadowColor = "#cb5a24";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // Nodes
      nodes.forEach((node) => {
        const pulseSize = node.size + Math.sin(node.pulse) * 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(203, 90, 36, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#cb5a24";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(node.label.toUpperCase(), node.x, node.y - 10);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full bg-[#0a0a0c]"
      style={{ display: "block" }}
    />
  );
}
