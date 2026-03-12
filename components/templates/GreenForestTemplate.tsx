"use client";

import { useEffect } from "react";
import './template-1.css';

import type { EventTemplateData } from "@/lib/events/template-preview";

type Props = {
  data: EventTemplateData;
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
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        <div className="rsvp reveal" data-animation="slide-in-blurred-br dur-350">
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
              We are so happy to celebrate our wedding with the people we love most.
              Join us for a joyful day in{" "}
              <span className="daje">{address}</span> <span>{address2}</span>
            </p>

            <div className="divider bottom reveal" data-animation="focus-in dur-2" />

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
              We hope you’ll join us on this special day.
            </p>

            <div className="divider bottom reveal" data-animation="focus-in dur-2" />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              A day of love, nature, celebration, music, and unforgettable memories.
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

            <div className="divider bottom reveal" data-animation="focus-in dur-2" />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              Your presence will make our celebration even more meaningful and special.
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

            <div className="divider bottom reveal" data-animation="focus-in dur-2" />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              A little glimpse of the bride and groom.
            </p>
          </div>
        </section>

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

            <div className="divider bottom reveal" data-animation="focus-in dur-2" />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              Please let us know if you’ll be joining us.
            </p>

            <form className="rsvp-form reveal" data-animation="focus-in dur-2">
              <div className="form-row">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" required />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-row">
                <label>Will you attend?</label>

                <div className="radio-group">
                  <label>
                    <input type="radio" name="attendance" value="accepted" required />
                    Joyfully Accept
                  </label>

                  <label>
                    <input type="radio" name="attendance" value="declined" required />
                    Regretfully Decline
                  </label>
                </div>
              </div>

              <div className="form-submit">
                <button type="submit" className="rsvp-submit">
                  Send RSVP
                </button>
              </div>
            </form>
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
              We can’t wait to celebrate this beautiful day with you.
            </p>

            <div className="divider bottom reveal" data-animation="focus-in dur-2" />

            <p className="subtext reveal" data-animation="focus-in dur-2">
              Thank you for being part of our story and for making this day even more
              special with your presence.
            </p>
          </div>
        </section>
      </div>

      <script
        src="https://kit.fontawesome.com/3b059272ba.js"
        crossOrigin="anonymous"
      />
    </>
  );
}