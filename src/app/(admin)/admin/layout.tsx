import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");

  return (
    <div className="flex min-h-screen" style={{ background: "var(--ink)" }}>
      <AdminSidebar user={session.user} />
      <main className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <div className="flex-1 px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
