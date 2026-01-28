'use client';

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogIn, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MegaMenuData } from "@/types";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  megaMenus: Record<string, MegaMenuData>;
}

export default function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  megaMenus,
}: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Main menu panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background overflow-y-auto pb-10"
          >
            <div className="container px-6 py-6 pb-24">
              <nav className="flex flex-col space-y-2">
                {Object.entries(megaMenus).map(([id, data]) => (
                  <div key={id} className="border-b border-border/50 last:border-0 pb-2">
                    <button
                      onClick={() => toggleSection(id)}
                      className="flex items-center justify-between w-full py-4 text-left group"
                    >
                      <span className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors uppercase">
                        {data.title}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedSection === id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedSection === id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-4 py-2">
                            {data.columns.map((column, colIdx) => (
                              <div key={colIdx} className="space-y-3">
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] px-1">
                                  {column.title}
                                </p>
                                <div className="space-y-1">
                                  {column.items.map((item, itemIdx) => (
                                    <Link
                                      key={itemIdx}
                                      href={item.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-all duration-200"
                                    >
                                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                                        {item.icon}
                                      </div>
                                      <div>
                                        <div className="text-sm font-semibold">{item.title}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}

                            {/* Featured item for the section */}
                            {data.featured && (
                              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                                <div className="text-sm font-bold text-primary mb-1">{data.featured.title}</div>
                                <div className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                  {data.featured.description}
                                </div>
                                <Link
                                  href={data.featured.ctaLink}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-xs font-bold text-primary inline-flex items-center gap-1 hover:underline"
                                >
                                  {data.featured.ctaText} <ExternalLink className="h-3 w-3" />
                                </Link>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Static pages */}
                <div className="py-2 space-y-1">
                  <Link
                    href="#pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center h-14 text-lg font-semibold border-b border-border/50 uppercase"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#testimonials"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center h-14 text-lg font-semibold border-b border-border/50 uppercase"
                  >
                    Testimonials
                  </Link>
                </div>

                {/* Account Actions */}
                <div className="pt-6 space-y-4">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 rounded-xl text-base font-bold flex gap-2">
                      <LogIn className="h-5 w-5" />
                      Log In
                    </Button>
                  </Link>
                  <Button className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20">
                    Get Started Free
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
