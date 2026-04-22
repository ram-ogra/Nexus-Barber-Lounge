"use client";

import { useState, useCallback } from "react";

const SERVICES = [
  { name: "Haircut", price: "₹599" },
  { name: "Beard Styling", price: "₹399" },
  { name: "Hair + Beard", price: "₹799" },
  { name: "Facial", price: "₹899" },
];

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
  "1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM",
  "5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM",
];

type Step = 1 | 2 | 3;
type FormState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
};

export default function BookingForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const update = useCallback(
    (field: keyof FormState, value: string) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const validateStep1 = () => {
    const errs: string[] = [];
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.push("Please enter your full name.");
    if (!form.phone.trim()) errs.push("Phone number is required.");
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      errs.push("Enter a valid 10-digit Indian mobile number.");
    return errs;
  };

  const validateStep2 = () => {
    const errs: string[] = [];
    if (!form.service) errs.push("Please select a service.");
    return errs;
  };

  const validateStep3 = () => {
    const errs: string[] = [];
    if (!form.date) errs.push("Please select a date.");
    if (!form.time) errs.push("Please select a time slot.");
    return errs;
  };

  const goNext = () => {
    let errs: string[] = [];
    if (step === 1) errs = validateStep1();
    if (step === 2) errs = validateStep2();
    setErrors(errs);
    if (errs.length === 0) setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };

  const goPrev = () => {
    setErrors([]);
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  };

  const handleSubmit = async () => {
    const errs = validateStep3();
    setErrors(errs);
    if (errs.length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setBookingId(data.booking.id);
        setSuccess(true);
        setTimeout(() => {
          window.open(data.whatsappUrl, "_blank");
        }, 1200);
      } else {
        setErrors(data.errors || ["Something went wrong. Please try again."]);
      }
    } catch {
      setErrors(["Network error. Please check your connection and try again."]);
    } finally {
      setLoading(false);
    }
  };

  const selectedService = SERVICES.find((s) => s.name === form.service);

  // ── Success Screen ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="booking-card p-8 md:p-12 text-center" style={{ borderRadius: "2px" }}>
        <div className="check-pop text-6xl mb-6">✅</div>
        <h3
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-playfair)",
            background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Booking Confirmed!
        </h3>
        <p className="text-yellow-100/50 text-sm mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
          Booking ID: <span className="text-yellow-500 font-semibold">{bookingId}</span>
        </p>
        <p className="text-yellow-100/40 text-sm mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
          Opening WhatsApp to confirm your appointment...
        </p>

        <div className="bg-yellow-900/10 border border-yellow-800/30 p-5 mb-8 text-left space-y-2">
          {[
            ["Name", form.name],
            ["Phone", form.phone],
            ["Service", `${form.service} (${selectedService?.price})`],
            ["Date", new Date(form.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })],
            ["Time", form.time],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-yellow-100/40" style={{ fontFamily: "var(--font-outfit)" }}>{label}</span>
              <span className="text-yellow-200 font-medium" style={{ fontFamily: "var(--font-outfit)" }}>{value}</span>
            </div>
          ))}
        </div>

        <a
          href={`https://wa.me/919376838329?text=${encodeURIComponent(
            `✂️ *New Booking – Nexus Barber Lounge*\n\n📋 *Booking ID:* ${bookingId}\n👤 *Name:* ${form.name}\n📞 *Phone:* ${form.phone}\n💈 *Service:* ${form.service} (${selectedService?.price})\n📅 *Date:* ${form.date}\n⏰ *Time:* ${form.time}\n\n_Please confirm this booking. Thank you!_`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn inline-flex items-center gap-3 px-8 py-4 text-white font-semibold text-sm tracking-wider uppercase"
          style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="booking-card" style={{ borderRadius: "2px" }}>
      {/* Progress indicator */}
      <div className="flex border-b border-yellow-800/20">
        {([1, 2, 3] as Step[]).map((s) => (
          <div
            key={s}
            className={`flex-1 py-4 text-center text-xs tracking-widest uppercase font-medium transition-all duration-300 border-b-2 ${
              step === s
                ? "text-yellow-500 border-yellow-500"
                : step > s
                ? "text-yellow-700 border-yellow-800/40"
                : "text-yellow-100/20 border-transparent"
            }`}
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {s === 1 ? "You" : s === 2 ? "Service" : "Schedule"}
          </div>
        ))}
      </div>

      <div className="p-6 md:p-10">
        {/* Error messages */}
        {errors.length > 0 && (
          <div className="mb-6 border border-red-800/50 bg-red-900/10 p-4 space-y-1">
            {errors.map((e, i) => (
              <p key={i} className="text-red-400 text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
                • {e}
              </p>
            ))}
          </div>
        )}

        {/* ── Step 1: Personal Details ───────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h3
                className="text-xl font-semibold text-yellow-100 mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Your Details
              </h3>
              <p className="text-xs text-yellow-100/30 tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                Tell us who you are
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-yellow-500/70 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Rahul Sharma"
                  className="luxury-input w-full px-4 py-3 text-sm"
                  style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-yellow-500/70 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <div
                    className="luxury-input px-3 py-3 text-sm text-yellow-100/40 flex items-center"
                    style={{ borderRadius: "2px", minWidth: "52px" }}
                  >
                    +91
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="9876543210"
                    className="luxury-input flex-1 px-4 py-3 text-sm"
                    style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Service Selection ──────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h3
                className="text-xl font-semibold text-yellow-100 mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Choose Service
              </h3>
              <p className="text-xs text-yellow-100/30 tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                Select what you&apos;d like today
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((svc) => (
                <button
                  key={svc.name}
                  onClick={() => update("service", svc.name)}
                  className={`group relative p-4 border text-left transition-all duration-300 ${
                    form.service === svc.name
                      ? "border-yellow-500 bg-yellow-900/15"
                      : "border-yellow-800/20 hover:border-yellow-600/40 bg-white/[0.02]"
                  }`}
                  style={{ borderRadius: "2px" }}
                >
                  <div className={`absolute top-0 left-0 h-px w-0 bg-yellow-500 transition-all duration-300 ${form.service === svc.name ? "w-full" : "group-hover:w-full"}`} />
                  {form.service === svc.name && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-500 flex items-center justify-center text-black text-[10px] font-bold">✓</div>
                  )}
                  <p className="text-sm font-semibold text-yellow-100 mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{svc.name}</p>
                  <p
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {svc.price}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Date & Time ────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h3
                className="text-xl font-semibold text-yellow-100 mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Pick a Slot
              </h3>
              <p className="text-xs text-yellow-100/30 tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                Choose your preferred date and time
              </p>
            </div>

            <div>
              <label className="block text-[10px] tracking-widest uppercase text-yellow-500/70 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                Date
              </label>
              <input
                type="date"
                value={form.date}
                min={today}
                max={maxDateStr}
                onChange={(e) => update("date", e.target.value)}
                className="luxury-input w-full px-4 py-3 text-sm"
                style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px", colorScheme: "dark" }}
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest uppercase text-yellow-500/70 mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-52 overflow-y-auto pr-1">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => update("time", t)}
                    className={`py-2 px-2 text-[11px] font-medium border transition-all duration-200 ${
                      form.time === t
                        ? "border-yellow-500 bg-yellow-900/20 text-yellow-400"
                        : "border-yellow-800/20 text-yellow-100/40 hover:border-yellow-600/40 hover:text-yellow-100/70"
                    }`}
                    style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Booking summary */}
            {form.service && form.date && form.time && (
              <div className="bg-yellow-900/10 border border-yellow-800/30 p-4 space-y-1">
                <p className="text-[10px] tracking-widest uppercase text-yellow-500/60 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>Summary</p>
                {[
                  ["Name", form.name],
                  ["Service", `${form.service} (${selectedService?.price})`],
                  ["Date", new Date(form.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })],
                  ["Time", form.time],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-yellow-100/30" style={{ fontFamily: "var(--font-outfit)" }}>{label}</span>
                    <span className="text-yellow-200/80" style={{ fontFamily: "var(--font-outfit)" }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
          {step > 1 && (
            <button
              onClick={goPrev}
              disabled={loading}
              className="px-6 py-3 border border-yellow-800/30 text-yellow-100/50 hover:text-yellow-100 hover:border-yellow-700/50 text-xs tracking-widest uppercase font-medium transition-all duration-300"
              style={{ fontFamily: "var(--font-outfit)", borderRadius: "2px" }}
            >
              ← Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={goNext}
              className="px-8 py-3 text-black text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:shadow-lg"
              style={{
                fontFamily: "var(--font-outfit)",
                background: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #9A7A2E 100%)",
                borderRadius: "2px",
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 sm:flex-none px-8 py-3 text-black text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{
                fontFamily: "var(--font-outfit)",
                background: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #9A7A2E 100%)",
                borderRadius: "2px",
              }}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Confirm via WhatsApp
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
