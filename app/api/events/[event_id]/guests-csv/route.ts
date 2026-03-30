import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function escapeCsvValue(value: string) {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

function formatCsvRow(values: Array<string | null | undefined>) {
  return values.map((value) => escapeCsvValue(value ?? "")).join(",");
}

function createFilename(title: string) {
  const normalized = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${normalized.replace(/^-+|-+$/g, "") || "event"}-guests.csv`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ event_id: string }> },
) {
  const { event_id } = await params;
  const user = await requireUser();
  const supabase = await createClient();

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, title")
    .eq("id", event_id)
    .eq("owner_user_id", user.id)
    .single();

  if (eventError || !event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  const { data: guests, error: guestsError } = await supabase
    .from("guests")
    .select("rsvp_status, rsvp_response_time, users(full_name, email)")
    .eq("event_id", event_id)
    .order("created_at", { ascending: false });

  if (guestsError) {
    console.error("Error fetching guests for CSV:", guestsError);
    return NextResponse.json(
      { error: "Failed to generate CSV." },
      { status: 500 },
    );
  }

  const header = formatCsvRow([
    "Name",
    "Email",
    "RSVP Status",
    "RSVP Time",
  ]);

  const rows = (guests ?? []).map((guest) =>
    formatCsvRow([
      guest.users?.full_name ?? "",
      guest.users?.email ?? "",
      guest.rsvp_status ?? "",
      guest.rsvp_response_time ?? "",
    ]),
  );

  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${createFilename(event.title)}"`,
      "Cache-Control": "no-store",
    },
  });
}
