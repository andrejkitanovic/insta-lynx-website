"use client";

import { useState, type FormEvent } from "react";
import {
  Envelope,
  Phone,
  MapPin,
  CalendarBlank,
  Truck,
  Buildings,
  CaretRight,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/animations";
import { submitContactForm } from "@/lib/api";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center sm:pt-24">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Contact NovaLinx
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Our team is available Monday–Friday, 9am–6pm EST. We&apos;d love
              to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* For Drivers */}
            <Reveal>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/4">
                  <Truck size={22} weight="duotone" className="text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium">For Drivers</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Questions about jobs, your profile, or the app.
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li className="flex items-center gap-2.5 text-neutral-400">
                    <Envelope size={15} weight="bold" className="text-neutral-600" />
                    drivers@novalinx.com
                  </li>
                  <li className="flex items-center gap-2.5 text-neutral-400">
                    <Phone size={15} weight="bold" className="text-neutral-600" />
                    (813) 644-3940
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* For Carriers */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/4">
                  <Buildings size={22} weight="duotone" className="text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium">For Carriers</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Interested in posting jobs or booking a demo.
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <a
                      href="https://calendly.com/novalinx/demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-neutral-400 transition hover:text-white"
                    >
                      <CalendarBlank size={15} weight="bold" className="text-neutral-600" />
                      Schedule a Call
                      <CaretRight size={12} weight="bold" className="text-neutral-600" />
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5 text-neutral-400">
                    <Envelope size={15} weight="bold" className="text-neutral-600" />
                    carriers@novalinx.com
                  </li>
                  <li className="flex items-center gap-2.5 text-neutral-400">
                    <Phone size={15} weight="bold" className="text-neutral-600" />
                    (813) 644-3940
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Headquarters */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/4">
                  <MapPin size={22} weight="duotone" className="text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium">Headquarters</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Come say hello.
                </p>
                <address className="mt-5 text-sm not-italic leading-relaxed text-neutral-400">
                  412 East Madison
                  <br />
                  Suite 1200
                  <br />
                  Tampa, Florida 33602
                  <br />
                  USA
                </address>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={0.25}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/8">
              <iframe
                title="NovaLinx Headquarters"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.7!2d-82.4572!3d27.9506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c48e5fd0c30d%3A0x0!2s412+E+Madison+St%2C+Tampa%2C+FL+33602!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale invert opacity-80"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact form */}
      <section className="border-t border-white/8 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Send Us a Message
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-2 text-sm text-neutral-500">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const inputCls = "w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/25 focus:bg-white/6";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    try {
      await submitContactForm({
        firstName: fd.get("firstName") as string,
        lastName: fd.get("lastName") as string,
        email: fd.get("email") as string,
        role: fd.get("role") as string,
        message: fd.get("message") as string,
      });
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-8 text-center">
        <p className="text-lg font-medium">Message sent!</p>
        <p className="mt-2 text-sm text-neutral-500">We&apos;ll get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-sm text-neutral-400 underline hover:text-white">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-600">First Name</label>
          <input name="firstName" type="text" required className={inputCls} placeholder="John" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-600">Last Name</label>
          <input name="lastName" type="text" required className={inputCls} placeholder="Doe" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-600">Email</label>
        <input name="email" type="email" required className={inputCls} placeholder="john@example.com" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-600">I am a...</label>
        <select name="role" className={inputCls + " text-neutral-400"}>
          <option>Driver</option>
          <option>Carrier</option>
          <option>Investor</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-600">Message</label>
        <textarea name="message" rows={4} required className={inputCls} placeholder="Tell us how we can help..." />
      </div>
      {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === "loading"} className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50">
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
