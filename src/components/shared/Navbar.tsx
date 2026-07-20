"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/why-capsurge', label: 'Why CapSurge' },
    { href: '/knowledge-centre', label: 'Knowledge Centre' },
    { href: '/careers', label: 'Careers' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return (pathname?.startsWith(path) && path !== '/') || pathname === path;
  };

  const desktopLinkStyle = (path: string) =>
    `text-sm font-semibold tracking-[0.01em] transition-colors lg:text-base xl:text-lg ${
      isActive(path) ? 'text-secondary' : 'text-white/88 hover:text-secondary'
    }`;

  const mobileLinkStyle = (path: string) =>
    `border-b border-white/10 pb-3 text-base font-semibold transition-colors ${
      isActive(path) ? 'text-secondary' : 'text-white/88 hover:text-secondary'
    }`;

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-3 md:top-6 md:px-4">
      <div className="relative mx-auto w-full max-w-[1400px] rounded-[30px] border border-white/10 bg-primary/88 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-5 md:h-24 md:px-8 lg:px-10">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-7 xl:gap-8">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className={desktopLinkStyle(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">
            <Link
              href={process.env.NEXT_PUBLIC_NEW_LINK || '#'}
              className="rounded-full border border-white/12 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:text-secondary lg:px-6 lg:py-3 lg:text-base"
            >
              Login
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full border border-white/12 bg-white/[0.06] p-2.5 text-white transition-colors hover:text-secondary focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-4 border-t border-white/10 px-5 pb-5 pt-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                href={link.href}
                className={mobileLinkStyle(link.href)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href={process.env.NEXT_PUBLIC_NEW_LINK || '#'}
              className="inline-flex rounded-full border border-white/12 bg-white/[0.06] px-5 py-2.5 text-base font-semibold text-white transition-colors hover:text-secondary"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
