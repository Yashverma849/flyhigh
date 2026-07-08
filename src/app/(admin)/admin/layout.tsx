import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { formatUserRole, getCurrentUserProfile } from "@/server/queries/users";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const profile = await getCurrentUserProfile({
    id: session.user.id,
    email: session.user.email,
  });
  const sessionRole = (session.user as typeof session.user & { role?: string }).role;
  const roleLabel = formatUserRole(profile?.role ?? sessionRole);
  const location = profile?.city?.trim() || "Mumbai";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--ink)" }}>
      <AdminSidebar user={session.user} roleLabel={roleLabel} location={location} />
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <AdminTopbar />
        <div className="flex-1 px-8 py-8">{children}</div>
      </main>
    </div>
  );
}

