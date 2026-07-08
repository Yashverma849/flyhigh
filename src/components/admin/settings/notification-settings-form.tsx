"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateNotificationSettings, type SettingsActionState } from "@/server/actions/settings";
import type { NotificationPreferences } from "@/lib/user-preferences";
import {
  SettingsFormFooter,
  SettingsPanel,
  SettingsToggle,
} from "@/components/admin/settings/settings-panel";

type Props = {
  preferences: NotificationPreferences;
};

const initial: SettingsActionState = { status: "idle" };

export function NotificationSettingsForm({ preferences }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateNotificationSettings, initial);

  useEffect(() => {
    if (state.status === "success") router.refresh();
  }, [state.status, router]);

  return (
    <SettingsPanel
      title="Notifications"
      description="Choose which operational alerts reach your inbox."
    >
      <form action={formAction} className="space-y-3">
        {state.status === "error" && state.message && (
          <p
            className="caption rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {state.message}
          </p>
        )}
        {state.status === "success" && (
          <p
            className="caption rounded-md border px-4 py-3"
            style={{ borderColor: "var(--cargo)", color: "var(--cargo)" }}
          >
            Notification preferences saved.
          </p>
        )}

        <SettingsToggle
          label="Shipment exceptions"
          description="Immediate alerts when a shipment enters Exception status."
          name="shipmentExceptions"
          defaultChecked={preferences.shipmentExceptions}
        />
        <SettingsToggle
          label="Customs holds"
          description="Notify when consignments are held at customs clearance."
          name="customsHolds"
          defaultChecked={preferences.customsHolds}
        />
        <SettingsToggle
          label="Weekly operations digest"
          description="Summary of throughput, revenue, and on-time performance."
          name="weeklyDigest"
          defaultChecked={preferences.weeklyDigest}
        />
        <SettingsToggle
          label="Product updates"
          description="Release notes and new Cockpit features from Flyhigh."
          name="productUpdates"
          defaultChecked={preferences.productUpdates}
        />

        <SettingsFormFooter submitLabel="Save preferences" pending={pending} />
      </form>
    </SettingsPanel>
  );
}
