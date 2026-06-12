import Link from "next/link";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT ME", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 sm:pt-6">
      <nav className="pointer-events-auto flex h-[52px] w-full max-w-[940px] items-center justify-between rounded-full bg-[#c7c5c7] px-4 shadow-[inset_0_-2px_0_rgba(19,34,45,0.08),0_1px_5px_rgba(20,35,45,0.16)] sm:px-5">
        <Link
          href="/#home"
          aria-label="Louise home"
          className="grid h-8 w-8 place-items-center rounded-sm border-2 border-[#263944] bg-[#e9e9e9] text-[18px] font-black leading-none text-[#263944] shadow-[inset_0_0_0_2px_rgba(38,57,68,0.16)]"
        >
          L
        </Link>

        <ul className="hidden items-center gap-12 text-[16px] font-medium tracking-normal text-[#122635] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-[#314653]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contact"
          className="rounded-full border border-[#182a35] bg-[#2f414d] px-7 py-1.5 text-[15px] font-medium tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:bg-[#243641] sm:px-8"
        >
          CONTACT
        </Link>
      </nav>
    </header>
  );
}
