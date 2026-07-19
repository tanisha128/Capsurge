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
    `text-base lg:text-lg font-medium transition-colors ${
      isActive(path) ? 'text-secondary' : 'hover:text-secondary'
    }`;

  const mobileLinkStyle = (path: string) =>
    `text-lg font-medium transition-colors border-b border-gray-100 pb-3 ${
      isActive(path) ? 'text-secondary' : 'hover:text-secondary'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-dim">
      <div className="container-custom h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 lg:gap-lg">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className={desktopLinkStyle(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-md">
          <Link href={process.env.NEXT_PUBLIC_NEW_LINK || '#'} className="text-base lg:text-lg font-medium transition-colors text-primary hover:text-secondary">
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-primary hover:text-secondary focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-[100%] left-0 w-full bg-white border-b border-surface-dim shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 shadow-inner">
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
          <Link onClick={() => setIsMobileMenuOpen(false)} href={process.env.NEXT_PUBLIC_NEW_LINK || '#'} className="text-lg font-medium transition-colors pb-2 hover:text-secondary">Login</Link>
        </div>
      </div>
    </nav>
  );
};
