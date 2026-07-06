"use client";

import { useEffect, useRef, useState } from "react";
const values = [
  {
    t: "Vision",
    b: "To be India's most trusted total-logistics house — the local partner for worldwide needs.",
  },
  {
    t: "Mission",
    b: "Reliable, safe, affordable services delivered with the precision of an atelier and the reach of an empire.",
  },
  {
    t: "Values",
    b: "Customers are the lifeline. Time is the currency. Craft is non-negotiable.",
  },
];

export function AboutCharter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 overflow-hidden relative"
      style={{ background: "var(--ink-2)" }}
    >
      <style>{`
        .plane-assembly {
          position: absolute;
          bottom: 100%;
          margin-bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
        }
        .plane-active {
          animation: plane-tow-in-mobile 9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .flag-banner-container {
          opacity: 0;
        }
        .flag-active {
          animation: flag-tow-in-mobile 9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, fly-float 6s ease-in-out infinite 4.2s;
        }
        .flag-banner {
          animation: flag-wave-shape-vertical 4s ease-in-out infinite;
          position: relative;
        }
        .flag-card-1 {
          animation: ripple-1 5s ease-in-out infinite 4.2s;
        }
        .flag-card-2 {
          animation: ripple-2 5.5s ease-in-out infinite 4.25s;
        }
        .flag-card-3 {
          animation: ripple-3 4.8s ease-in-out infinite 4.3s;
        }
        @keyframes plane-tow-in-mobile {
          0% {
            transform: translate(80vw, -40vh) translateX(-50%);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          45% {
            transform: translate(0, 0) translateX(-50%);
            opacity: 1;
          }
          55% {
            transform: translate(-10vw, 15vh) translateX(-50%);
            opacity: 1;
          }
          100% {
            transform: translate(-150vw, 100vh) translateX(-50%);
            opacity: 0;
          }
        }
        @keyframes flag-tow-in-mobile {
          0% {
            transform: translate(80vw, -40vh);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          45% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(0, 0);
            opacity: 1;
          }
        }
        @keyframes plane-tow-in-desktop {
          0% {
            transform: translateX(100vw) translateY(-50%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          45% {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
          55% {
            transform: translateX(-15vw) translateY(-50%);
            opacity: 1;
          }
          100% {
            transform: translateX(-150vw) translateY(-50%);
            opacity: 0;
          }
        }
        @keyframes flag-tow-in-desktop {
          0% {
            transform: translateX(100vw);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          45% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fly-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-0.5deg); }
        }
        @keyframes ripple-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-0.2deg); }
        }
        @keyframes ripple-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.3deg); }
        }
        @keyframes ripple-3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-0.1deg); }
        }
        @keyframes flag-wave-shape-vertical {
          0%, 100% {
            clip-path: polygon(
              0% 0%, 100% 0%, 98% 20%, 101% 40%, 98% 60%, 101% 80%, 100% 96%, 50% 90%, 0% 96%, 2% 80%, -1% 60%, 2% 40%, -1% 20%
            );
          }
          50% {
            clip-path: polygon(
              0% 0%, 100% 0%, 101% 20%, 98% 40%, 101% 60%, 98% 80%, 100% 96%, 50% 90%, 0% 96%, -1% 80%, 2% 60%, -1% 40%, 2% 20%
            );
          }
        }
        @keyframes flag-wave-shape {
          0%, 100% {
            clip-path: polygon(
              0% 0%, 20% 3%, 40% -1%, 60% 3%, 80% -1%, 100% 2%, 96% 50%, 100% 98%, 80% 101%, 60% 97%, 40% 101%, 20% 97%, 0% 100%
            );
          }
          50% {
            clip-path: polygon(
              0% 0%, 20% -1%, 40% 3%, 60% -1%, 80% 3%, 100% -1%, 96% 50%, 100% 101%, 80% 97%, 60% 101%, 40% 97%, 20% 101%, 0% 100%
            );
          }
        }
        .flag-shading {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            rgba(255, 255, 255, 0.16) 0%,
            rgba(0, 0, 0, 0.08) 25%,
            rgba(255, 255, 255, 0.16) 50%,
            rgba(0, 0, 0, 0.08) 75%,
            rgba(255, 255, 255, 0.16) 100%
          );
          background-size: 200% 100%;
          mix-blend-mode: soft-light;
          animation: wave-shading 3.5s linear infinite;
          z-index: 10;
        }
        @keyframes wave-shading {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        .grommet-top {
          top: 4px;
          left: 25%;
        }
        .grommet-bottom {
          top: 4px;
          left: 75%;
        }
        @media (min-width: 1024px) {
          .plane-assembly {
            bottom: auto;
            top: 50%;
            right: 100%;
            margin-right: 4rem;
            left: auto;
            margin-bottom: 0;
          }
          .plane-active {
            animation: plane-tow-in-desktop 9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .flag-active {
            animation: flag-tow-in-desktop 9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, fly-float 6s ease-in-out infinite 4.2s;
          }
          .flag-banner {
            animation: flag-wave-shape 4s ease-in-out infinite;
          }
          .grommet-top {
            left: 4px;
            top: 25%;
          }
          .grommet-bottom {
            left: 4px;
            top: 75%;
          }
        }
      `}</style>

      <div className="site-gutter">
        {/* Plane and Flag Container */}
        <div className="relative flex flex-col items-center lg:flex-row lg:justify-center">
          {/* 1. Airplane (Flies across and goes off-screen) */}
          <div className={`plane-assembly ${visible ? "plane-active" : ""}`}>
            <svg
              viewBox="0 0 120 50"
              className="w-48 h-20 md:w-[24rem] md:h-40 filter drop-shadow-md"
              fill="none"
              stroke="var(--cargo)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Detailed fuselage outline */}
              <path d="M 10,25 C 8,23 20,16 38,16 L 95,16 C 102,16 106,11 108,7 L 110,7 C 109,13 107,20 106,22 C 106,24 107,31 108,37 L 106,37 C 104,31 100,28 95,28 L 38,28 C 20,28 8,26 10,25 Z" />
              {/* Cockpit canopy */}
              <path d="M 14,21 Q 18,18 22,21 Z" />
              {/* Cargo door lines */}
              <path d="M 28,23 L 38,23 L 38,27 L 28,27 Z M 76,22 L 83,22 L 83,26 L 76,26 Z" />
              {/* Detailed passenger windows */}
              <circle cx="44" cy="21" r="0.6" fill="var(--cargo)" />
              <circle cx="48" cy="21" r="0.6" fill="var(--cargo)" />
              <circle cx="52" cy="21" r="0.6" fill="var(--cargo)" />
              <circle cx="56" cy="21" r="0.6" fill="var(--cargo)" />
              <circle cx="60" cy="21" r="0.6" fill="var(--cargo)" />
              <circle cx="64" cy="21" r="0.6" fill="var(--cargo)" />
              {/* Swept back wings */}
              <path d="M 46,25 L 75,45 L 83,45 L 63,25 Z" fill="var(--ink-2)" opacity="0.3" />
              {/* Engine under wing */}
              <rect x="58" y="32" width="10" height="5" rx="1.5" strokeWidth="1.2" />
              <path d="M 58,34.5 L 68,34.5" />
              <path d="M 59,32 L 59,37 M 67,32 L 67,37" />
              {/* Tail vertical stabilizer fin */}
              <path d="M 94,16 L 108,1 L 114,1 L 103,16 Z" fill="var(--ink-2)" opacity="0.3" />
              {/* Horizontal stabilizer fin */}
              <path d="M 95,28 L 105,36 L 109,36 L 101,28 Z" fill="var(--ink-2)" opacity="0.3" />
            </svg>
          </div>

          {/* 2. Flag Structure */}
          <div className={`flag-banner-container z-10 w-full max-w-7xl ${visible ? "flag-active" : ""}`}>
            <div
              className="flag-banner w-full flex flex-col gap-6 p-6 pb-20 md:pb-24 lg:flex-row lg:gap-8 lg:p-10 lg:pr-24 lg:pb-10"
              style={{
                background: "var(--ink-3)",
                borderLeft: "8px solid var(--cargo)", // flag heading sleeve tape
                borderRadius: "4px 8px 8px 4px",
              }}
            >
              {/* Horizontal Tow Rope (Desktop) */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-[100vw] border-t-2 border-dashed hidden lg:block" style={{ borderColor: "var(--brass)", opacity: 0.6 }} />
              
              {/* Vertical Tow Rope (Mobile) */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 h-16 border-l-2 border-dashed lg:hidden" style={{ borderColor: "var(--brass)", opacity: 0.6 }} />

              {/* Grommets */}
              <div className="absolute grommet-top w-2.5 h-2.5 rounded-full border-2 border-[var(--brass)] bg-[var(--ink-2)] z-20" />
              <div className="absolute grommet-bottom w-2.5 h-2.5 rounded-full border-2 border-[var(--brass)] bg-[var(--ink-2)] z-20" />

              {/* Shading overlay for realistic waving folds */}
              <div className="flag-shading" />

              {values.map(({ t, b }, idx) => {
                const cardClass = `flag-card-${idx + 1}`;
                return (
                  <div
                    key={t}
                    className={`${cardClass} flex-1 p-6 md:p-8 rounded-xl flex flex-col justify-between`}
                    style={{
                      background: "var(--ink-2)",
                      border: "1px solid var(--line)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <div>
                      <h3 className="f-display mb-4 text-2xl md:text-3xl">{t}</h3>
                      <p className="leading-relaxed text-sm md:text-base text-left" style={{ color: "var(--ash)" }}>
                        {b}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
