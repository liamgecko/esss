import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-neutral-950 px-4 py-5 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center" aria-label="Home">
            <Image
              src="/esss-logo.svg"
              alt="ESSS Logo"
              width={126}
              height={60}
              priority
              className="h-14 w-auto sm:h-20"
            />
          </Link>

          {/* Navigation and CTA Section */}
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/recent-work"
              className="nav-link text-sm font-medium text-white"
            >
              Recent work
            </Link>
            {/* Enquire Button - Always visible */}
            <Link
              href="#enquire"
              className="rounded bg-brand-red px-5 py-2.5 text-sm font-bold leading-none text-white transition-colors hover:opacity-90"
            >
              Enquire
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
