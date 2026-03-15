"use client";
import MseLink from "@/components/Ui/MseLink/MseLink";
import MseLogo from "@/components/Ui/MseLogo/MseLogo";
import { cn } from "@/utils";
import Container from "@/components/Common/Container/Container";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";

const linkList = [
  { label: "Home", href: "/" },
  { label: "Profiles", href: "/profile" },
  { label: "Editor", href: "/profile/editor" },
  { label: "How to", href: "/how-to" },
  { label: "Blog", href: "/blog" },
];

/* ── Prismatic shimmer line along the navbar bottom ── */
const PrismBorder = () => (
  <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
    <motion.div
      className="h-full w-[200%]"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, #22d3ee 15%, #a78bfa 35%, #fb7185 50%, #a78bfa 65%, #22d3ee 85%, transparent 100%)",
      }}
      animate={{ x: ["-50%", "0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

/* ── Floating sparkle particles near active indicator ── */
const Sparkle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 3,
      height: 3,
      background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
      filter: "blur(0.5px)",
    }}
    initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      y: [0, -18, -28],
      x: [0, (Math.random() - 0.5) * 20],
      scale: [0, 1.2, 0],
    }}
    transition={{
      duration: 1.8,
      delay,
      repeat: Infinity,
      repeatDelay: 2.5,
      ease: "easeOut",
    }}
  />
);

/* ── Active link orbital glow indicator ── */
const ActiveIndicator = () => (
  <motion.div
    layoutId="nav-active-glow"
    className="absolute -bottom-[1px] left-0 right-0 flex justify-center"
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  >
    {/* Glow base */}
    <motion.div
      className="w-8 h-[3px] rounded-full"
      style={{
        background: "linear-gradient(90deg, #22d3ee, #a78bfa, #fb7185)",
        boxShadow:
          "0 0 8px rgba(34,211,238,0.6), 0 0 20px rgba(167,139,250,0.3), 0 0 40px rgba(251,113,133,0.15)",
      }}
      animate={{
        boxShadow: [
          "0 0 8px rgba(34,211,238,0.6), 0 0 20px rgba(167,139,250,0.3), 0 0 40px rgba(251,113,133,0.15)",
          "0 0 14px rgba(34,211,238,0.8), 0 0 30px rgba(167,139,250,0.5), 0 0 50px rgba(251,113,133,0.25)",
          "0 0 8px rgba(34,211,238,0.6), 0 0 20px rgba(167,139,250,0.3), 0 0 40px rgba(251,113,133,0.15)",
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Sparkle particles */}
    <div className="absolute top-0">
      {[0, 0.6, 1.2].map((d, i) => (
        <Sparkle key={i} delay={d} />
      ))}
    </div>
  </motion.div>
);

/* ── Nav link with magnetic hover glow ── */
const NavLink = ({
  href,
  label,
  isActive,
  index,
}: {
  href: string;
  label: string;
  isActive: boolean;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const glowOpacity = useMotionValue(0);
  const springOpacity = useSpring(glowOpacity, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => glowOpacity.set(1)}
      onMouseLeave={() => glowOpacity.set(0)}
    >
      {/* Magnetic glow that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-3 rounded-xl"
        style={{
          x: useTransform(glowX, (v) => v - 40),
          y: useTransform(glowY, (v) => v - 40),
          width: 80,
          height: 80,
          background:
            "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          opacity: springOpacity,
        }}
      />

      <MseLink
        href={href}
        className={cn(
          "relative font-display text-[13px] font-bold uppercase tracking-[0.15em] py-2 px-1 transition-colors duration-300",
          isActive
            ? "text-white"
            : "text-zinc-500 hover:text-zinc-200"
        )}
      >
        <span className="relative z-10">{label}</span>
        {isActive && <ActiveIndicator />}
      </MseLink>
    </motion.div>
  );
};

/* ── Morphing hamburger / X icon ── */
const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-5 flex flex-col justify-between">
    <motion.span
      className="block h-[2px] rounded-full origin-left"
      style={{ background: "linear-gradient(90deg, #22d3ee, #a78bfa)" }}
      animate={
        isOpen
          ? { rotate: 45, y: 0, width: "100%" }
          : { rotate: 0, y: 0, width: "100%" }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.span
      className="block h-[2px] rounded-full"
      style={{ background: "#a78bfa" }}
      animate={
        isOpen
          ? { opacity: 0, x: 12, width: "60%" }
          : { opacity: 1, x: 0, width: "60%" }
      }
      transition={{ duration: 0.25 }}
    />
    <motion.span
      className="block h-[2px] rounded-full origin-left"
      style={{ background: "linear-gradient(90deg, #a78bfa, #fb7185)" }}
      animate={
        isOpen
          ? { rotate: -45, y: 0, width: "100%" }
          : { rotate: 0, y: 0, width: "100%" }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
);

/* ── Mobile nav link with stagger ── */
const MobileNavLink = ({
  href,
  label,
  isActive,
  index,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, x: 40, filter: "blur(8px)" }}
    transition={{
      delay: 0.08 + index * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    <MseLink
      href={href}
      className="group relative block py-3"
    >
      <span onClick={onClick} className="flex items-center gap-4">
        {/* Index number */}
        <span className="font-mono text-xs text-zinc-600 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Link label */}
        <span
          className={cn(
            "font-display text-4xl sm:text-5xl font-bold tracking-tight transition-all duration-300",
            isActive
              ? "bg-prism-gradient bg-clip-text text-transparent"
              : "text-zinc-400 group-hover:text-white"
          )}
        >
          {label}
        </span>

        {/* Active dot */}
        {isActive && (
          <motion.span
            layoutId="mobile-active-dot"
            className="w-2 h-2 rounded-full"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #fb7185)",
              boxShadow: "0 0 12px rgba(167,139,250,0.6)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </span>

      {/* Hover line reveal */}
      <motion.div
        className="absolute bottom-0 left-8 right-0 h-[1px] bg-white/5 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      />
    </MseLink>
  </motion.div>
);

/* ── Main Navbar ── */
const Navbar = () => {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          scrolled
            ? "bg-obsidian/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-obsidian/60 backdrop-blur-xl"
        )}
      >
        <PrismBorder />

        <Container
          withPadding
          className="flex flex-row items-center justify-between h-16"
        >
          {/* Logo with entrance animation */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <MseLogo />
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-row items-center gap-10">
            {linkList.map((link, i) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                isActive={path === link.href}
                index={i}
              />
            ))}

            {/* CTA-style Contact link */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <MseLink
                href="/contact-us"
                className={cn(
                  "relative font-display text-[13px] font-bold uppercase tracking-[0.15em]",
                  "px-4 py-1.5 rounded-full overflow-hidden",
                  "transition-all duration-300",
                  path === "/contact-us"
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {/* Prism border glow */}
                <span
                  className="absolute inset-0 rounded-full opacity-60"
                  style={{
                    padding: "1px",
                    background: "linear-gradient(135deg, #22d3ee, #a78bfa, #fb7185)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(167,139,250,0.08), rgba(251,113,133,0.08))",
                  }}
                  whileHover={{ opacity: 1 }}
                />
                <span className="relative z-10">Contact</span>
              </MseLink>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden relative p-2 z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <MenuIcon isOpen={mobileOpen} />
          </motion.button>
        </Container>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(167,139,250,0.08), transparent 50%), radial-gradient(ellipse at bottom left, rgba(34,211,238,0.05), transparent 50%), #09090bf5",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Decorative grid lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-0 left-8 w-[1px] h-full bg-white/[0.03]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />
              <motion.div
                className="absolute top-0 right-8 w-[1px] h-full bg-white/[0.03]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />
            </div>

            {/* Menu content */}
            <div className="relative h-full flex flex-col justify-center px-8 sm:px-12">
              {/* Section label */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                  Navigation
                </span>
              </motion.div>

              {/* Links */}
              <nav className="flex flex-col gap-2">
                {linkList.map((link, i) => (
                  <MobileNavLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                    isActive={path === link.href}
                    index={i}
                    onClick={closeMobile}
                  />
                ))}
                <MobileNavLink
                  href="/contact-us"
                  label="Contact"
                  isActive={path === "/contact-us"}
                  index={linkList.length}
                  onClick={closeMobile}
                />
              </nav>

              {/* Bottom decoration */}
              <motion.div
                className="absolute bottom-12 left-8 right-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="h-[1px] w-full bg-white/5 mb-4" />
                <p className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                  Myanmar Software Engineers
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
