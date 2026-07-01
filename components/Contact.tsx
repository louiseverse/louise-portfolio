import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const contactLinks = [
  {
    label: "Email:",
    value: "soledad.louiseangelo@gmail.com",
    href: "mailto:soledad.louiseangelo@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "Location:",
    value: "Caloocan, Philippines",
    href: "https://www.google.com/maps/search/Caloocan,+Philippines",
    icon: FaMapMarkerAlt,
  },
  {
    label: "Phone Number:",
    value: "09614044162",
    href: "tel:09107216912",
    icon: FaPhoneAlt,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/louise.soledad.7",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/louiseeverse",
    icon: FaInstagram,
  },
  { label: "GitHub", href: "https://github.com/Louisesoledad", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/louiseangelosoledad", icon: FaLinkedinIn },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative -mt-px overflow-hidden bg-[#DCDCDD] px-6 pb-20 pt-28 text-white sm:px-10 lg:pb-24 lg:pt-36"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #DCDCDD 0%, #8a9399 200px, #36454F 420px, #36454F 100%)",
        }}
      />

      {/* ── Soft fading dot grid (same pattern as Skills) ── */}
      <div
        className="absolute inset-x-0 top-0 h-[380px] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(54,69,79,.15) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.6) 25%, rgba(0,0,0,.3) 65%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.6) 25%, rgba(0,0,0,.3) 65%, transparent 100%)",
        }}
      />

      <div
        className="absolute -right-[18vw] bottom-[-16vw] hidden h-[44vw] w-[44vw] rounded-full bg-[#4C5C68]/45 lg:block"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 0% 0%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 0%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1120px] gap-14 lg:grid-cols-[1fr_0.88fr] lg:items-start">
        <div>
          <h2 className="max-w-[460px] text-[42px] font-extrabold leading-[1.18] tracking-normal sm:text-5xl lg:text-[54px]">
            Let&apos;s build something useful.
          </h2>

          <p className="mt-7 max-w-[560px] text-[15px] leading-7 text-white/78">
            Open for software development, web app, and collaboration
            opportunities. Reach out and let&apos;s talk about the project,
            idea, or system you want to bring to life.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/78 text-white transition hover:bg-white hover:text-[#36454F] cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex rounded-full border border-white bg-white px-7 py-3 text-sm font-semibold text-[#36454F] transition hover:bg-transparent hover:text-white cursor-pointer"
          >
            View Resume
          </a>
        </div>

        <div className="grid gap-7">
          {contactLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex min-h-[98px] items-center gap-5 rounded-lg border border-white/36 bg-[#36454F]/30 px-6 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_18px_42px_rgba(10,20,26,0.16)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/70 hover:bg-white/8 cursor-pointer"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/80 text-white transition group-hover:bg-white group-hover:text-[#36454F]">
                  <Icon className="h-5 w-5" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-white">
                    {item.label}
                  </span>

                  <span className="mt-1 block truncate text-sm leading-snug text-white/68">
                    {item.value}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}