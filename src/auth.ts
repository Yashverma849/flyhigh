// Auth temporarily disabled. To re-enable, restore the NextAuth wiring
// (see git history) and set AUTH_SECRET / AUTH_RESEND_KEY / AUTH_RESEND_FROM.

type Handler = (req: Request) => Response;

const disabled: Handler = () =>
  new Response("Auth disabled", { status: 404 });

export const handlers = { GET: disabled, POST: disabled };

type StubSession = {
  user: { name?: string | null; email?: string | null; role?: string } | null;
} | null;

export async function auth(): Promise<StubSession> {
  return null;
}

export async function signIn(): Promise<never> {
  throw new Error("Auth is disabled");
}

export async function signOut(): Promise<never> {
  throw new Error("Auth is disabled");
}
