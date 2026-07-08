export type NotificationPreferences = {
  shipmentExceptions: boolean;
  customsHolds: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
};

export type UserPreferences = {
  notifications?: Partial<NotificationPreferences>;
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  shipmentExceptions: true,
  customsHolds: true,
  weeklyDigest: false,
  productUpdates: false,
};

export function resolveNotificationPreferences(
  preferences: UserPreferences | null | undefined,
): NotificationPreferences {
  return {
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    ...preferences?.notifications,
  };
}
