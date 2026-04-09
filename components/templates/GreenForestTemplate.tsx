"use client";
/** Green Forest event invitation template that renders a styled public-facing event page. */
import Script from "next/script";
import { useEffect, useState } from "react";
import "./green-forest-template.css";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { EventTemplateData } from "@/lib/events/template-preview";
import { usePathname } from "next/navigation";
import { submitRsvp } from "@/lib/data/submitRsvp";
import { getColorPaletteById } from "@/lib/events/color-palettes";

type Props = {
  data: EventTemplateData & { id: string };
};

export default function GreenForestTemplate({ data }: Props) {
  const eventName = data.name;
  const eventDate = data.start_time;
  const address = data.address;
  const address2 = [data.city, data.state, data.postal_code, data.country]
    .filter(Boolean)
    .join(", ");
  const googleMapsLink = data.google_maps_link;
  const description = data.description;
  const coupleImage = data.main_image_url;
  const videoUrl = data.video_url;
 const colorPalette =
  typeof data.color_palette === "string"
    ? getColorPaletteById(data.color_palette)
    : data.color_palette ?? (data.color_palette_id
        ? getColorPaletteById(data.color_palette_id)
        : null);
  console.log("GreenForestTemplate received data:", data, colorPalette);
  useEffect(() => {
    // Apply color palette to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--green', colorPalette?.primary ?? null);
    root.style.setProperty('--light-green', colorPalette?.primary_light ?? null);
    root.style.setProperty('--yellow', colorPalette?.accent ?? null);
    root.style.setProperty('--yellow-down', colorPalette?.accent_light ?? null);
    root.style.setProperty('--beige', colorPalette?.background ?? null);
    root.style.setProperty('--red', colorPalette?.accent_secondary ?? null);
    root.style.setProperty('--text', colorPalette?.text ?? null);
    root.style.setProperty('--shadow-color', colorPalette?.shadow_hue ?? null);
  }, [colorPalette]);

  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [attendance, setAttendance] = useState<"accepted" | "declined" | "">(
    "",
  );
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const animation = el.dataset.animation;
            el.classList.add("in-view");
            if (animation) {
              animation.split(" ").forEach((cls) => el.classList.add(cls));
            }
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: sessionData }) => {
      setUser(sessionData.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendMagicLink = async () => {
    if (!email) return;
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    });
    setMagicSent(true);
    setLoading(false);
  };

  const handleRsvp = async () => {
    if (!attendance) return;
    setLoading(true);
    setErrorMsg("");

    try {
      await submitRsvp(data.id, attendance, pathname);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap"
        rel="stylesheet"
      />

      <div className="template-one home">
        <div
          className="rsvp reveal"
          data-animation="slide-in-blurred-br dur-350"
        >
          <a href="#rsvp-form">
            <img
              src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/RSVP-2.png"
              alt="RSVP"
            />
          </a>
        </div>

        <section className="hero">
          <img
            className="img-over img-top img-left reveal"
            data-animation="slide-in-blurred-tl dur-250"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Foglie.png"
            alt=""
          />
          <img
            className="img-over img-top img-right reveal"
            data-animation="slide-in-blurred-tr dur-350"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Fiori.png"
            alt=""
          />
          <img
            className="img-over img-bottom img-left reveal"
            data-animation="slide-in-blurred-bl dur-3"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Scoppio.png"
            alt=""
          />
          <img
            className="img-over img-bottom img-right reveal"
            data-animation="slide-in-blurred-br dur-2"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Uccello.png"
            alt=""
          />

          <div className="reveal" data-animation="focus-in dur-2">
            <h1 className="hero-title">{eventName}</h1>
            <p className="date">{eventDate}</p>
          </div>

          <a
            href="#welcome"
            className="bounce arrow-bounce reveal"
            data-animation="focus-in dur-4"
          >
            <i className="fa fa-2x fa-chevron-down" />
          </a>
        </section>

        <section id="welcome" className="standard">
          <div>
            <p className="bigtext reveal" data-animation="focus-in dur-2">
              We are so happy to celebrate our wedding with the people we love
              most. Join us for a joyful day in{" "}
              <span className="daje">{address}</span> <span>{address2}</span>
            </p>

            <div
              className="divider bottom reveal"
              data-animation="focus-in dur-2"
            />

            <p className="details reveal" data-animation="focus-in dur-2">
              <a href={googleMapsLink} target="_blank" rel="noreferrer">
                Open in Maps
              </a>
            </p>
          </div>
        </section>

        <section className="standard alt">
          <div>
            <img
              className="img-remark remark-top reveal"
              data-animation="slide-in-blurred-top dur-2"
              src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Margherite.png"
              alt=""
            />

            <p className="hugetext reveal" data-animation="focus-in dur-2">
              We hope you&apos;ll join us on this special day.
            </p>

            <div
              className="divider bottom reveal"
              data-animation="focus-in dur-2"
            />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              A day of love, nature, celebration, music, and unforgettable
              memories.
            </p>
          </div>
        </section>

        <section className="standard alt video">
          <img
            className="img-over img-top img-left reveal"
            data-animation="slide-in-blurred-tl dur-2"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Foglie-Video-01.png"
            alt=""
          />
          <img
            className="img-over img-top img-right reveal"
            data-animation="slide-in-blurred-tr dur-2"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Foglie-Video-03.png"
            alt=""
          />
          <img
            className="img-over img-bottom img-left reveal"
            data-animation="slide-in-blurred-bl dur-2"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Foglie-Video-04.png"
            alt=""
          />
          <img
            className="img-over img-bottom img-right reveal"
            data-animation="slide-in-blurred-br dur-2"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Foglie-Video-02.png"
            alt=""
          />

          <p className="bigtext reveal" data-animation="focus-in dur-2">
            Every love story is beautiful, and this is a little glimpse into{" "}
            <span className="daje">ours</span> before the big day.
          </p>

          {videoUrl ? (
            <iframe
              className="reveal"
              data-animation="focus-in dur-2"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </section>

        <section className="standard">
          <div>
            <p className="bigtext reveal" data-animation="focus-in dur-2">
              {description.split("love").length > 1 ? (
                <>
                  {description.split("love")[0]}
                  <span className="daje">love</span>
                  {description.split("love").slice(1).join("love")}
                </>
              ) : (
                description
              )}
            </p>

            <div
              className="divider bottom reveal"
              data-animation="focus-in dur-2"
            />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              Your presence will make our celebration even more meaningful and
              special.
            </p>
          </div>
        </section>

        <section className="standard alt couple-section">
          <div>
            <img
              className="img-remark reveal couple-photo"
              data-animation="focus-in dur-2"
              src={coupleImage}
              alt="Bride and groom"
            />

            <div
              className="divider bottom reveal"
              data-animation="focus-in dur-2"
            />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              A little glimpse of the bride and groom.
            </p>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="standard rsvp-form-section" id="rsvp-form">
          <div>
            <img
              className="img-remark remark-top reveal"
              data-animation="slide-in-blurred-top dur-2"
              src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Margherite.png"
              alt=""
            />

            <p className="hugetext reveal" data-animation="focus-in dur-2">
              RSVP
            </p>

            <div
              className="divider bottom reveal"
              data-animation="focus-in dur-2"
            />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              Please let us know if you&apos;ll be joining us.
            </p>

            <div className="rsvp-form reveal" data-animation="focus-in dur-2">
              {submitted ? (
                /* ── Thank you state ── */
                <p className="subtext">
                  {attendance === "accepted"
                    ? "You're coming! We can't wait to see you."
                    : "We'll miss you, but thank you for letting us know."}
                </p>
              ) : !user ? (
                /* ── Not logged in ── */
                magicSent ? (
                  <p className="subtext">
                    Check your email — we sent you a login link. Click it to
                    come back and RSVP.
                  </p>
                ) : (
                  <>
                    <p className="subtext">
                      Enter your email to verify your identity and RSVP.
                    </p>
                    <div className="form-row">
                      <label htmlFor="magic-email">Email</label>
                      <input
                        type="email"
                        id="magic-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="form-submit">
                      <button
                        type="button"
                        className="rsvp-submit"
                        onClick={sendMagicLink}
                        disabled={loading || !email}
                      >
                        {loading ? "Sending..." : "Send login link"}
                      </button>
                    </div>
                  </>
                )
              ) : (
                /* ── Logged in ── */
                <>
                  <p className="subtext">Logged in as {user.email}</p>
                  <div className="form-row">
                    <label>Will you attend?</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="attendance"
                          value="accepted"
                          checked={attendance === "accepted"}
                          onChange={() => setAttendance("accepted")}
                        />
                        Joyfully Accept
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="attendance"
                          value="declined"
                          checked={attendance === "declined"}
                          onChange={() => setAttendance("declined")}
                        />
                        Regretfully Decline
                      </label>
                    </div>
                  </div>

                  {errorMsg && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "0.9rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {errorMsg}
                    </p>
                  )}

                  <div className="form-submit">
                    <button
                      type="button"
                      className="rsvp-submit"
                      onClick={handleRsvp}
                      disabled={!attendance || loading}
                    >
                      {loading ? "Sending..." : "Send RSVP"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="standard closing-section">
          <img
            className="img-over img-bottom img-left reveal"
            data-animation="slide-in-blurred-bl dur-2"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Scoppio.png"
            alt=""
          />
          <img
            className="img-over img-bottom img-right reveal"
            data-animation="slide-in-blurred-br dur-2"
            src="https://pejdmljopqhvyadmvttr.supabase.co/storage/v1/object/public/wedding-images-template/Uccello.png"
            alt=""
          />

          <div>
            <p className="bigtext reveal" data-animation="focus-in dur-2">
              We can&apos;t wait to celebrate this beautiful day with you.
            </p>

            <div
              className="divider bottom reveal"
              data-animation="focus-in dur-2"
            />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              Thank you for being part of our story and for making this day even
              more special with your presence.
            </p>
          </div>
        </section>
      </div>

      <Script 
        src="https://kit.fontawesome.com/3b059272ba.js"
        crossOrigin="anonymous"
      />
    </>
  );
}
