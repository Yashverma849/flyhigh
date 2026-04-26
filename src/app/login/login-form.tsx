// Auth temporarily disabled — the form is rendered for layout continuity but
// submission is a no-op. Restore `signIn("resend", …)` when auth is back.

type Props = { callbackUrl: string };

export function LoginForm(_props: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--ash)" }}>
        Sign-in is temporarily disabled. The cockpit is open — head to{" "}
        <a href="/admin" style={{ color: "var(--brass)" }}>
          /admin
        </a>{" "}
        directly.
      </p>
    </div>
  );
}
