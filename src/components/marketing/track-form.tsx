"use client";

import { useActionState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { trackShipment } from "@/server/actions/track";

const initial = { error: undefined as string | undefined };

export function TrackForm() {
  const [state, action, pending] = useActionState(async (_prev: typeof initial, fd: FormData) => {
    const result = await trackShipment(_prev, fd);
    return result ?? initial;
  }, initial);

  return (
    <form action={action} className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute top-1/2 left-4 -translate-y-1/2 opacity-50"
            aria-hidden="true"
          />
          <input
            name="id"
            required
            placeholder="FH-2403-001892"
            className="input pl-11 tracking-wider uppercase"
            autoComplete="off"
            aria-label="Tracking ID"
          />
        </div>
        <button type="submit" disabled={pending} className="btn-primary shrink-0">
          {pending ? "Looking…" : "Track"} <ArrowRight size={14} />
        </button>
      </div>
      {state.error && (
        <p className="text-sm" style={{ color: "var(--rust)" }}>
          {state.error}
        </p>
      )}
    </form>
  );
}
