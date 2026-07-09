"use client";

import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  buildMediaLibrary,
  type CaseStudyRow,
  type MarketingPageRow,
  type MediaRow,
} from "@/lib/admin-content-data";
import { NewInsightModal } from "@/components/admin/new-insight-modal";
import { EditInsightModal } from "@/components/admin/edit-insight-modal";
import { NewCaseStudyModal } from "@/components/admin/new-case-study-modal";
import { EditCaseStudyModal } from "@/components/admin/edit-case-study-modal";
import { DeleteInsightModal } from "@/components/admin/delete-insight-modal";
import { DeleteCaseStudyModal } from "@/components/admin/delete-case-study-modal";
import { ContentDetailModal } from "@/components/admin/content-detail-modal";
import type { InsightRow, DbCaseStudy } from "@/server/db/schema";

const TABS = [
  { id: "posts", label: "Insights posts" },
  { id: "pages", label: "Marketing pages" },
  { id: "cases", label: "Case studies" },
  { id: "media", label: "Media library" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type Props = {
  posts: InsightRow[];
  marketingPages: MarketingPageRow[];
  caseStudies: DbCaseStudy[];
};

export function ContentPageClient({ posts, marketingPages, caseStudies }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("posts");
  const [createOpen, setCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<InsightRow | null>(null);
  const [deletingPost, setDeletingPost] = useState<InsightRow | null>(null);
  const [createCaseStudyOpen, setCreateCaseStudyOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<DbCaseStudy | null>(null);
  const [deletingCaseStudy, setDeletingCaseStudy] = useState<DbCaseStudy | null>(null);
  const [detail, setDetail] = useState<{
    title: string;
    eyebrow: string;
    fields: Array<{ label: string; value: string }>;
    previewHref?: string;
    imageUrl?: string;
  } | null>(null);

  const mediaItems = buildMediaLibrary(posts, caseStudies);

  const tabCounts: Record<TabId, number> = {
    posts: posts.length,
    pages: marketingPages.length,
    cases: caseStudies.length,
    media: mediaItems.length,
  };

  function openPageDetail(page: MarketingPageRow) {
    setDetail({
      title: page.title,
      eyebrow: "MARKETING PAGE",
      fields: [
        { label: "Section", value: page.section },
        { label: "Path", value: page.path },
      ],
      previewHref: page.path,
    });
  }

  function openCaseDetail(study: CaseStudyRow) {
    setDetail({
      title: study.title,
      eyebrow: "CASE STUDY",
      fields: [
        { label: "Client", value: study.client },
        { label: "Industry", value: study.industry },
        { label: "Published", value: study.date },
        { label: "Excerpt", value: study.excerpt },
      ],
      previewHref: `/case-studies/${study.slug}`,
      imageUrl: study.image,
    });
  }

  function openMediaDetail(item: MediaRow) {
    setDetail({
      title: item.title,
      eyebrow: "MEDIA ASSET",
      fields: [
        { label: "Source", value: item.source },
        { label: "URL", value: item.url },
      ],
      imageUrl: item.url,
    });
  }

  return (
    <>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="f-display text-4xl">Content</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
            Insights articles, marketing pages, and case studies — all your published surfaces in
            one ledger.
          </p>
        </div>
        {activeTab === "posts" && (
          <button
            type="button"
            className="btn-primary flex items-center gap-2 text-sm"
            onClick={() => setCreateOpen(true)}
          >
            New post <Plus size={14} />
          </button>
        )}
        {activeTab === "cases" && (
          <button
            type="button"
            className="btn-primary flex items-center gap-2 text-sm"
            onClick={() => setCreateCaseStudyOpen(true)}
          >
            New case study <Plus size={14} />
          </button>
        )}
      </div>

      <div className="mb-6 flex items-center gap-1 overflow-x-auto border-b" style={{ borderColor: "var(--line)" }}>
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="shrink-0 px-4 py-3 text-sm transition-colors"
              style={{
                color: active ? "var(--bone)" : "var(--ash)",
                borderBottom: active ? "2px solid var(--cargo)" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {tab.label}{" "}
              <span className="caption ml-1.5" style={{ color: "var(--ash)" }}>
                {tabCounts[tab.id]}
              </span>
            </button>
          );
        })}
      </div>

      {activeTab === "posts" && (
        <ContentTable
          headers={["Title", "Category", "Author", "Published", ""]}
          emptyMessage='No insights yet. Click "New post" or run pnpm db:seed.'
        >
          {posts.map((p) => (
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
                {p.publishedAt ? formatDate(p.publishedAt) : "Draft"}
              </td>
              <td className="px-6 py-4">
                <RowActions
                  previewHref={p.publishedAt ? `/insights/${p.slug}` : undefined}
                  onEdit={() => setEditingPost(p)}
                  onDelete={() => setDeletingPost(p)}
                />
              </td>
            </tr>
          ))}
        </ContentTable>
      )}

      {activeTab === "pages" && (
        <ContentTable
          headers={["Page", "Section", "Path", ""]}
          emptyMessage="No marketing pages configured."
        >
          {marketingPages.map((page) => (
            <tr
              key={page.id}
              className="border-t transition-colors hover:bg-[var(--surface-tint-2)]"
              style={{ borderColor: "var(--line)" }}
            >
              <td className="px-6 py-4 font-medium">{page.title}</td>
              <td className="caption px-6 py-4" style={{ color: "var(--brass)" }}>
                {page.section}
              </td>
              <td className="f-mono px-6 py-4 text-xs" style={{ color: "var(--ash)" }}>
                {page.path}
              </td>
              <td className="px-6 py-4">
                <RowActions previewHref={page.path} onEdit={() => openPageDetail(page)} />
              </td>
            </tr>
          ))}
        </ContentTable>
      )}

      {activeTab === "cases" && (
        <ContentTable
          headers={["Title", "Client", "Industry", "Published", ""]}
          emptyMessage="No case studies in the catalog."
        >
          {caseStudies.map((study) => (
            <tr
              key={study.slug}
              className="border-t transition-colors hover:bg-[var(--surface-tint-2)]"
              style={{ borderColor: "var(--line)" }}
            >
              <td className="px-6 py-4">
                <div className="font-medium">{study.title}</div>
                <div className="caption mt-1" style={{ color: "var(--ash)" }}>
                  {study.excerpt.slice(0, 80)}
                  {study.excerpt.length > 80 && "…"}
                </div>
              </td>
              <td className="px-6 py-4" style={{ color: "var(--ash)" }}>
                {study.client}
              </td>
              <td className="caption px-6 py-4" style={{ color: "var(--brass)" }}>
                {study.industry}
              </td>
              <td className="f-mono tabular px-6 py-4 text-xs">{study.date}</td>
              <td className="px-6 py-4">
                <RowActions
                  previewHref={`/case-studies/${study.slug}`}
                  onEdit={() => setEditingCaseStudy(study)}
                  onDelete={() => setDeletingCaseStudy(study)}
                />
              </td>
            </tr>
          ))}
        </ContentTable>
      )}

      {activeTab === "media" && (
        <div
          className="overflow-hidden rounded-md border"
          style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
        >
          {mediaItems.length === 0 ? (
            <div className="caption px-6 py-12 text-center" style={{ color: "var(--ash)" }}>
              No media assets yet. Add hero images to insight posts or case studies.
            </div>
          ) : (
            <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
              {mediaItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-md border"
                  style={{ borderColor: "var(--line)", background: "var(--ink-3)" }}
                >
                  <div
                    className="aspect-[16/10] bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.url})` }}
                  />
                  <div className="space-y-3 p-4">
                    <div className="caption" style={{ color: "var(--brass)" }}>
                      {item.source}
                    </div>
                    <div className="text-sm leading-snug">{item.title}</div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                        aria-label="View media"
                        onClick={() => openMediaDetail(item)}
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                        aria-label="Edit media details"
                        onClick={() => openMediaDetail(item)}
                      >
                        <Edit3 size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      <NewInsightModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditInsightModal post={editingPost} onClose={() => setEditingPost(null)} />
      <DeleteInsightModal post={deletingPost} onClose={() => setDeletingPost(null)} />
      <NewCaseStudyModal open={createCaseStudyOpen} onClose={() => setCreateCaseStudyOpen(false)} />
      <EditCaseStudyModal study={editingCaseStudy} onClose={() => setEditingCaseStudy(null)} />
      <DeleteCaseStudyModal study={deletingCaseStudy} onClose={() => setDeletingCaseStudy(null)} />
      <ContentDetailModal detail={detail} onClose={() => setDetail(null)} />
    </>
  );
}

function ContentTable({
  headers,
  emptyMessage,
  children,
}: {
  headers: string[];
  emptyMessage: string;
  children: React.ReactNode;
}) {
  const rows = Array.isArray(children) ? children : [children];
  const hasRows = rows.length > 0 && rows.some((row) => row != null);

  return (
    <div
      className="overflow-hidden rounded-md border"
      style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead style={{ background: "var(--ink-3)" }}>
            <tr>
              {headers.map((h) => (
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
            {!hasRows ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="caption px-6 py-12 text-center"
                  style={{ color: "var(--ash)" }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RowActions({
  previewHref,
  onEdit,
  onDelete,
}: {
  previewHref?: string;
  onEdit: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {previewHref ? (
        <Link
          href={previewHref as Route}
          target="_blank"
          className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
          aria-label="Preview"
        >
          <Eye size={13} />
        </Link>
      ) : (
        <span
          className="rounded p-1.5 opacity-30"
          aria-label="Preview unavailable for drafts"
          title="Publish to preview"
        >
          <Eye size={13} />
        </span>
      )}
      <button
        type="button"
        className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
        aria-label="Edit"
        onClick={onEdit}
      >
        <Edit3 size={13} />
      </button>
      {onDelete && (
        <button
          type="button"
          className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
          aria-label="Delete"
          onClick={onDelete}
          style={{ color: "var(--rust)" }}
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}
