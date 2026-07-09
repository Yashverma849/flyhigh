import { InquiriesNav } from "@/components/admin/inquiries/inquiries-nav";

export default function AdminInquiriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="f-display text-4xl">Inquiries</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
          Quote requests from /quote and contact messages from /contact — all inbound leads in one
          place.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <InquiriesNav />
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
