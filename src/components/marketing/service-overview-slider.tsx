"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getServiceBySlug } from "@/server/db/seed/services";
import { toServiceOverview } from "@/lib/service-overview";
import { ServiceOverviewCard } from "@/components/marketing/service-overview-card";

type Props = {
  serviceSlugs: string[];
};

const DRAG_THRESHOLD_PX = 5;

function normalizeWheelDelta(
  delta: number,
  deltaMode: number,
  containerWidth: number,
): number {
  if (delta === 0) return 0;

  switch (deltaMode) {
    case WheelEvent.DOM_DELTA_LINE:
      return delta * 32;
    case WheelEvent.DOM_DELTA_PAGE:
      return delta * containerWidth * 0.85;
    default:
      return delta * 1.15;
  }
}

function getHorizontalWheelDelta(e: WheelEvent, containerWidth: number): number {
  const deltaX = normalizeWheelDelta(e.deltaX, e.deltaMode, containerWidth);
  const deltaY = normalizeWheelDelta(e.deltaY, e.deltaMode, containerWidth);
  return deltaX + deltaY;
}

export function ServiceOverviewSlider({ serviceSlugs }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const dragStateRef = useRef({
    active: false,
    pending: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const overviews = useMemo(
    () =>
      serviceSlugs
        .map((slug) => getServiceBySlug(slug))
        .filter((service): service is NonNullable<typeof service> => Boolean(service))
        .map(toServiceOverview),
    [serviceSlugs],
  );

  const checkScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  const getMaxScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;
    return Math.max(0, container.scrollWidth - container.clientWidth);
  }, []);

  const scrollByDelta = useCallback(
    (delta: number) => {
      const container = containerRef.current;
      if (!container || delta === 0) return false;

      const maxScroll = getMaxScroll();
      const next = Math.min(maxScroll, Math.max(0, container.scrollLeft + delta));
      if (Math.abs(next - container.scrollLeft) < 1) return false;

      container.scrollTo({ left: next, behavior: "auto" });
      checkScroll();
      return true;
    },
    [checkScroll, getMaxScroll],
  );

  const setHovered = useCallback((value: boolean) => {
    isHoveredRef.current = value;
    setIsHovered(value);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const handleWheel = (e: WheelEvent) => {
      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      const delta = getHorizontalWheelDelta(e, container.clientWidth);
      if (delta === 0) return;

      const next = container.scrollLeft + delta;
      const clamped = Math.min(maxScroll, Math.max(0, next));
      if (Math.abs(clamped - container.scrollLeft) < 1) return;

      e.preventDefault();
      e.stopPropagation();
      container.scrollLeft = clamped;
      checkScroll();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("a, button")) return;

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      dragStateRef.current = {
        active: false,
        pending: true,
        startX: e.clientX,
        scrollLeft: container.scrollLeft,
        pointerId: e.pointerId,
      };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const drag = dragStateRef.current;
      if (e.pointerId !== drag.pointerId) return;

      if (drag.pending) {
        if (Math.abs(e.clientX - drag.startX) < DRAG_THRESHOLD_PX) return;
        drag.pending = false;
        drag.active = true;
        setIsDragging(true);
        wrapper.setPointerCapture(e.pointerId);
      }

      if (!drag.active) return;

      const deltaX = drag.startX - e.clientX;
      const maxScroll = getMaxScroll();
      const next = Math.min(maxScroll, Math.max(0, drag.scrollLeft + deltaX));
      container.scrollLeft = next;
      checkScroll();
    };

    const endDrag = (e: PointerEvent) => {
      const drag = dragStateRef.current;
      if (e.pointerId !== drag.pointerId) return;

      drag.active = false;
      drag.pending = false;
      setIsDragging(false);
      if (wrapper.hasPointerCapture(e.pointerId)) {
        wrapper.releasePointerCapture(e.pointerId);
      }
    };

    let touchStartX = 0;
    let touchScrollLeft = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0]!.clientX;
      touchScrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      const deltaX = touchStartX - e.touches[0]!.clientX;
      const next = Math.min(maxScroll, Math.max(0, touchScrollLeft + deltaX));
      if (Math.abs(next - container.scrollLeft) < 1) return;

      e.preventDefault();
      container.scrollLeft = next;
      checkScroll();
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    wrapper.addEventListener("pointerdown", handlePointerDown);
    wrapper.addEventListener("pointermove", handlePointerMove);
    wrapper.addEventListener("pointerup", endDrag);
    wrapper.addEventListener("pointercancel", endDrag);
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => {
      wrapper.removeEventListener("wheel", handleWheel, { capture: true });
      wrapper.removeEventListener("pointerdown", handlePointerDown);
      wrapper.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerup", endDrag);
      wrapper.removeEventListener("pointercancel", endDrag);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, getMaxScroll, overviews.length]);

  useEffect(() => {
    if (isHovered || overviews.length <= 1) return;

    const interval = setInterval(() => {
      if (!containerRef.current || isHoveredRef.current || dragStateRef.current.active) return;

      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const firstChild = containerRef.current.children[0] as HTMLElement | undefined;
      const cardWidth = firstChild ? firstChild.clientWidth + 24 : clientWidth * 0.75;

      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, overviews.length]);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollByDelta(scrollAmount);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full min-w-0 max-w-full overflow-x-hidden ${isDragging ? "cursor-grabbing select-none" : isHovered ? "cursor-grab" : ""}`}
      style={{ touchAction: "pan-x" }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute -top-20 right-0 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
            canScrollLeft
              ? "border-brass text-bone hover:border-cargo hover:bg-cargo hover:text-white"
              : "cursor-not-allowed border-line text-ash opacity-40"
          }`}
          aria-label="Previous service"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
            canScrollRight
              ? "border-brass text-bone hover:border-cargo hover:bg-cargo hover:text-white"
              : "cursor-not-allowed border-line text-ash opacity-40"
          }`}
          aria-label="Next service"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={containerRef}
        onScroll={checkScroll}
        className={`no-scrollbar flex w-full min-w-0 max-w-full gap-4 overflow-x-auto overscroll-x-contain pb-4 sm:gap-6 ${
          isHovered ? "snap-none" : "snap-x snap-proximity"
        }`}
        style={{ scrollBehavior: "auto", WebkitOverflowScrolling: "touch" }}
      >
        {overviews.map((overview) => (
          <ServiceOverviewCard key={overview.slug} overview={overview} />
        ))}
      </div>
    </div>
  );
}
