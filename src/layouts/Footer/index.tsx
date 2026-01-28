'use client';

import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-8 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-lg">
                B
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">BusinessCMS</span>
            </Link>
            <p className="text-base text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Empowering businesses with powerful content management solutions for the modern web.
            </p>
            <div className="flex space-x-5">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-foreground">Product</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-foreground">Company</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-foreground">Legal</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors inline-block hover-translate-x-1 duration-200">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BusinessCMS. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Status
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
