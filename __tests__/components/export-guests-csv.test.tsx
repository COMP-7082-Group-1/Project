import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExportGuestsCSV from "@/components/dashboard/events/export-guests-csv";

globalThis.URL.createObjectURL = vi.fn().mockReturnValue("blob:fake-url");
globalThis.URL.revokeObjectURL = vi.fn();

const SAMPLE_GUESTS = [
  {
    id: "g-1",
    user_id: "u-1",
    rsvp_status: "accepted",
    rsvp_response_time: "2026-04-01T10:00:00Z",
    users: { full_name: "Henry Tan", email: "Henry@example.com" },
  },
  {
    id: "g-2",
    user_id: "u-2",
    rsvp_status: "declined",
    rsvp_response_time: null,
    users: { full_name: "Not Henry", email: "notHenry@example.com" },
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ExportGuestsCSV", () => {
  it("renders the Export CSV button", () => {
    render(<ExportGuestsCSV guests={[]} eventName="Test Event" />);
    expect(
      screen.getByRole("button", { name: /export csv/i }),
    ).toBeInTheDocument();
  });

  it("calls creates the CSV when the button is clicked", async () => {
    render(<ExportGuestsCSV guests={SAMPLE_GUESTS} eventName="Summer BBQ" />);
    await userEvent.click(screen.getByRole("button", { name: /export csv/i }));
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  it("revokes the URL after the download is triggered", async () => {
    render(<ExportGuestsCSV guests={SAMPLE_GUESTS} eventName="Summer BBQ" />);
    await userEvent.click(screen.getByRole("button", { name: /export csv/i }));
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it("generates a Blob with text/csv MIME type", async () => {
    let capturedBlob: Blob | undefined;
    (URL.createObjectURL as ReturnType<typeof vi.fn>).mockImplementation(
      (blob: Blob) => {
        capturedBlob = blob;
        return "blob:fake-url";
      },
    );

    render(<ExportGuestsCSV guests={SAMPLE_GUESTS} eventName="Party" />);
    await userEvent.click(screen.getByRole("button", { name: /export csv/i }));

    expect(capturedBlob).toBeDefined();
    expect(capturedBlob!.type).toContain("text/csv");
  });

  it("includes guest names in the CSV", async () => {
    let capturedBlob: Blob | undefined;
    (URL.createObjectURL as ReturnType<typeof vi.fn>).mockImplementation(
      (blob: Blob) => {
        capturedBlob = blob;
        return "blob:fake-url";
      },
    );

    render(<ExportGuestsCSV guests={SAMPLE_GUESTS} eventName="Party" />);
    await userEvent.click(screen.getByRole("button", { name: /export csv/i }));

    const text = await capturedBlob!.text();
    expect(text).toContain("Henry Tan");
    expect(text).toContain("Henry@example.com");
    expect(text).toContain("accepted");
  });
});
