import type { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { SettingsPanel } from "@/components/admin/settings/settings-panel";
import { formatUserRole, listTeamMembers } from "@/server/queries/users";

export const metadata: Metadata = { title: "Settings · Team & roles" };

export default async function AdminSettingsTeamPage() {
  let members: Awaited<ReturnType<typeof listTeamMembers>> = [];
  try {
    members = await listTeamMembers();
  } catch {
    members = [];
  }

  return (
    <SettingsPanel
      title="Team & roles"
      description="Cockpit users synced from your Supabase user table."
    >
      {members.length === 0 ? (
        <div className="caption py-8 text-center" style={{ color: "var(--ash)" }}>
          No team members found. Create users through sign-up or Supabase Auth.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--ink-3)" }}>
              <tr>
                {["Name", "Email", "Phone", "Role", "Joined"].map((header) => (
                  <th
                    key={header}
                    className="caption px-4 py-3 text-left font-normal"
                    style={{ color: "var(--ash)" }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-t" style={{ borderColor: "var(--line)" }}>
                  <td className="px-4 py-4 font-medium">{member.name ?? "—"}</td>
                  <td className="px-4 py-4" style={{ color: "var(--ash)" }}>
                    {member.email}
                  </td>
                  <td className="f-mono px-4 py-4 text-xs">{member.phone ?? "—"}</td>
                  <td className="caption px-4 py-4" style={{ color: "var(--brass)" }}>
                    {formatUserRole(member.role)}
                  </td>
                  <td className="f-mono tabular px-4 py-4 text-xs">
                    {formatDate(member.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SettingsPanel>
  );
}
