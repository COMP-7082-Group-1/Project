import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn().mockImplementation((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

const mockGetUser = vi.hoisted(() => vi.fn());
const mockFrom = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  }),
}));

import { submitRsvp } from "@/lib/data/submitRsvp";

function selectChain(result: { data: unknown; error: unknown }) {
  const single = vi.fn().mockResolvedValue(result);
  const eq2 = vi.fn(() => ({ single }));
  const eq1 = vi.fn(() => ({ eq: eq2 }));
  return { select: vi.fn(() => ({ eq: eq1 })) };
}

function updateChain(result: { error: unknown }) {
  const eq = vi.fn().mockResolvedValue(result);
  return { update: vi.fn(() => ({ eq })) };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("submitRsvp", () => {
  it("redirects to sign-up when the user is not authenticated", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    await expect(
      submitRsvp("evt-1", "accepted", "/events/summer-bbq"),
    ).rejects.toThrow(/REDIRECT/);
  });

  it("throws when the user's email is not on the guest list", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "test@test.com" } },
    });
    mockFrom.mockReturnValueOnce(
      selectChain({ data: null, error: { message: "Not found" } }),
    );

    await expect(
      submitRsvp("evt-1", "accepted", "/events/summer-bbq"),
    ).rejects.toThrow(/not on the guest list/i);
  });

  it("returns { success: true } for a valid RSVP submission", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "test@test.com" } },
    });
    mockFrom.mockReturnValueOnce(
      selectChain({ data: { id: "guest-1" }, error: null }),
    );
    mockFrom.mockReturnValueOnce(updateChain({ error: null }));

    const result = await submitRsvp("evt-1", "accepted", "/events/test");

    expect(result).toEqual({ success: true });
  });

  it("throws when the database update fails", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "test@test.com" } },
    });
    mockFrom.mockReturnValueOnce(
      selectChain({ data: { id: "guest-1" }, error: null }),
    );
    mockFrom.mockReturnValueOnce(
      updateChain({ error: { message: "DB write failed" } }),
    );

    await expect(
      submitRsvp("evt-1", "accepted", "/events/test"),
    ).rejects.toThrow("DB write failed");
  });
});
