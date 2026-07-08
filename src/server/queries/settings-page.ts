import "server-only";
import { auth } from "@/auth";
import { resolveNotificationPreferences } from "@/lib/user-preferences";
import { formatUserRole, getCurrentUserProfile } from "@/server/queries/users";

export async function getSettingsContext() {
  const session = await auth();
  const user = session?.user;
  const profile = await getCurrentUserProfile({
    id: user?.id,
    email: user?.email,
  });

  const role =
    profile?.role ??
    ((user as typeof user & { role?: string })?.role as "admin" | "staff" | undefined);

  return {
    profile,
    displayName: profile?.name ?? user?.name ?? "",
    email: profile?.email ?? user?.email ?? "",
    phone: profile?.phone ?? "",
    roleLabel: formatUserRole(role),
    timezone: profile?.timezone ?? "Asia/Kolkata",
    language: profile?.language ?? "en",
    country: profile?.country ?? "",
    city: profile?.city ?? "",
    notifications: resolveNotificationPreferences(profile?.preferences),
    hasDbProfile: profile != null,
  };
}
