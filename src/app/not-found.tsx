import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="topo flex min-h-screen items-center justify-center px-6"
      style={{ background: "var(--ink)" }}
    >
      <div className="text-center">
        <div className="caption" style={{ color: "var(--brass)" }}>
          404 · NOT IN THE LEDGER
        </div>
        <h1 className="f-display mt-4 text-[80px] leading-tight tracking-tight md:text-[120px]">
          A route we
          <br />
          <span className="f-display-it" style={{ color: "var(--cargo)" }}>
            don&apos;t serve.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg" style={{ color: "var(--ash)" }}>
          That page is in transit, or never existed. Try the lobby.
        </p>
        <Link href="/" className="btn-primary mt-10 inline-flex">
          Back to home <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}
