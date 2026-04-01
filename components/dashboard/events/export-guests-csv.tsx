"use client";

type Guest = {
  id: string;
  user_id: string;
  rsvp_status: string | null;
  rsvp_response_time: string | null;
  users?: {
    full_name?: string | null;
    email?: string | null;
  } | null;
};

export default function ExportGuestsCSV({
  guests,
  eventName,
}: {
  guests: Guest[];
  eventName: string;
}) {
  function handleExport() {
    const headers = ["Name", "Email", "RSVP Status", "RSVP Time"];

    const rows = guests.map((guest) => {
      const name = guest.users?.full_name ?? "";
      const email = guest.users?.email ?? "";
      const status = guest.rsvp_status ?? "";
      const time = guest.rsvp_response_time
        ? new Date(guest.rsvp_response_time).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";

      return [name, email, status, time].map((v) =>
        `"${v.replace(/"/g, '""')}"`
      );
    });

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventName.replace(/[^a-z0-9]/gi, "_")}_guests.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="text-sm px-3 py-1.5 rounded-md border hover:bg-muted transition-colors"
    >
      Export CSV
    </button>
  );
}
