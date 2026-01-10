import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="bg-neutral-950 px-6 py-5 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl px-6 items-center justify-between">
          {/* Logo Section */}
          <a href="#" className="flex items-center">
            <Image
              src="/esss-logo.svg"
              alt="ESSS Logo"
              width={126}
              height={60}
              priority
              className="h-auto w-auto"
            />
          </a>

          {/* Navigation and CTA Section */}
          <nav className="flex items-center gap-8">
            {/* Navigation Links - Hidden on small screens */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#about"
                className="nav-link text-sm font-medium text-white"
              >
                About us
              </a>
              <a
                href="#services"
                className="nav-link text-sm font-medium text-white"
              >
                Our services
              </a>
              <a
                href="#testimonials"
                className="nav-link text-sm font-medium text-white"
              >
                Testimonials
              </a>
            </div>
            {/* Enquire Button - Always visible */}
            <a
              href="#enquire"
              className="rounded bg-brand-red px-5 py-2.5 text-sm font-bold leading-none text-white transition-colors hover:opacity-90"
            >
              Enquire
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
