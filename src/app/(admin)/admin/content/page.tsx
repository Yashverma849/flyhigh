import type { Metadata } from "next";
import Link from "next/link";
import { Edit3, Eye, Plus } from "lucide-react";
import { listPublishedInsights } from "@/server/queries/insights";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Content / CMS" };

const TABS = [
  { id: "posts", label: "Insights posts" },
  { id: "pages", label: "Marketing pages" },
  { id: "cases", label: "Case studies" },
  { id: "media", label: "Media library" },
] as const;

export default async function AdminContentPage() {
  let posts: Awaited<ReturnType<typeof listPublishedInsights>> = [];
  try {
    posts = await listPublishedInsights();
  } catch {
    posts = [];
  }

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="caption mb-2" style={{ color: "var(--cargo)" }}>
            03 · CMS
          </div>
          <h1 className="f-display text-4xl">Content</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
            Insights articles, marketing pages, and case studies — all your published surfaces in
            one ledger.
          </p>
        </div>
        <button type="button" className="btn-primary text-sm">
          New post <Plus size={14} />
        </button>
      </div>

      {/* Tabs (visual only — single posts pane is wired) */}
      <div className="mb-6 flex items-center gap-1 border-b" style={{ borderColor: "var(--line)" }}>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className="px-4 py-3 text-sm transition-colors"
            style={{
              color: i === 0 ? "var(--bone)" : "var(--ash)",
              borderBottom: i === 0 ? "2px solid var(--cargo)" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {t.label}{" "}
            {i === 0 && (
              <span className="caption ml-1.5" style={{ color: "var(--ash)" }}>
                {posts.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div
        className="overflow-hidden rounded-md border"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--ink-3)" }}>
              <tr>
                {["Title", "Category", "Author", "Published", ""].map((h) => (
                  <th
                    key={h || "actions"}
                    className="caption px-6 py-4 text-left font-normal"
                    style={{ color: "var(--ash)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="caption px-6 py-12 text-center"
                    style={{ color: "var(--ash)" }}
                  >
                    No insights yet. Run{" "}
                    <span className="f-mono text-[var(--brass)]">pnpm db:seed</span> to populate
                    demo content.
                  </td>
                </tr>
              ) : (
                posts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t transition-colors hover:bg-[var(--surface-tint-2)]"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium">{p.title}</div>
                      <div className="caption mt-1" style={{ color: "var(--ash)" }}>
                        {p.excerpt.slice(0, 80)}
                        {p.excerpt.length > 80 && "…"}
                      </div>
                    </td>
                    <td className="caption px-6 py-4" style={{ color: "var(--brass)" }}>
                      {p.category}
                    </td>
                    <td className="px-6 py-4" style={{ color: "var(--ash)" }}>
                      Editorial Desk
                    </td>
                    <td className="f-mono tabular px-6 py-4 text-xs">
                      {p.publishedAt ? formatDate(p.publishedAt) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/insights/${p.slug}`}
                          target="_blank"
                          className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                          aria-label="Preview"
                        >
                          <Eye size={13} />
                        </Link>
                        <button
                          type="button"
                          className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                          aria-label="Edit"
                        >
                          <Edit3 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
