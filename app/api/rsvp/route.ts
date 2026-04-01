import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  // Check they are logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        redirectTo: "/auth/sign-up",
      },
      { status: 401 }
    );
  }

  const { eventId, attendance } = await req.json();

  // Check their email is on the guest list for this event
  const { data: guest, error } = await supabase
    .from("guests")
    .select("id")
    .eq("event_id", eventId)
    .eq("email", user.email)
    .single();

  if (error || !guest) {
    return NextResponse.json(
      { error: "You are not on the guest list for this event." },
      { status: 403 }
    );
  }

  // Save their RSVP
  const { error: updateError } = await supabase
    .from("guests")
    .update({
      rsvp_status: attendance,
      rsvp_response_time: new Date().toISOString(),
      user_id: user.id,
    })
    .eq("id", guest.id);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}