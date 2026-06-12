import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold">
            Louise
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Frontend Developer Portfolio
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-gray-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-500">
        © 2025 Louise. All rights reserved.
      </div>
    </footer>
  );
}