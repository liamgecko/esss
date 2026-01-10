import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-950">

      <div className="mx-auto max-w-7xl px-6 py-8 border-t border-white/10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left - Logo */}
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/esss-logo.svg"
              alt="ESSS Logo"
              width={126}
              height={60}
              className="h-auto w-auto"
            />
          </a>

          {/* Right - Copyright */}
          <p className="text-sm text-gray-300">
            Copyright Engineering Specialised Support Services 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
