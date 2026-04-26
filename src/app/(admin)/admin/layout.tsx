import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

// Auth temporarily disabled — admin pages are open. Re-add the `auth()` /
// `redirect("/login")` gate when auth is restored.

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--ink)" }}>
      <AdminSidebar user={null} />
      <main className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <div className="flex-1 px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
