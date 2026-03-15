"use client";
/* eslint-disable @next/next/no-img-element */

import { motion, useInView, type Variants } from "framer-motion";
import React, { useRef } from "react";
import { FaGithub, FaFacebook, FaEnvelope } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { aboutData, achievementData, expData } from "./data";

// ─── Animation Variants ─────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

// ─── Scroll Reveal Hook ─────────────────────────────────

function useReveal(margin?: string) {
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once: true, margin: (margin ?? "-80px") as any });
  return { ref, isInView };
}

// ─── Section Header ─────────────────────────────────────

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-lg">{icon}</span>
      <h2 className="text-lg sm:text-xl font-display font-bold text-zinc-100 whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

// ─── Hero Section ───────────────────────────────────────

function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="text-center mb-14"
    >
      {/* Avatar with prismatic ring */}
      <motion.div variants={scaleIn} className="mb-5 inline-block">
        <div className="lmp-avatar-ring p-[3px] rounded-full inline-block">
          <img
            src="https://avatars.githubusercontent.com/u/49163775?v=4"
            alt="Lwin Moe Paing"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover bg-obsidian"
          />
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-display font-bold bg-prism-gradient bg-clip-text text-transparent mb-1.5"
      >
        Lwin Moe Paing
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-zinc-500 text-sm tracking-wide mb-8"
      >
        Fullstack Developer&ensp;·&ensp;8+ Years
      </motion.p>

      {/* Pyit-Taing-Htaung Quote */}
      <motion.div
        variants={fadeUp}
        className="relative max-w-2xl mx-auto bg-surface/60 backdrop-blur-sm border border-white/[0.04] rounded-2xl p-6 sm:p-8 text-left"
      >
        {/* Prismatic left accent bar */}
        <div className="absolute top-3 bottom-3 left-0 w-[3px] rounded-full bg-prism-gradient" />

        {/* Oversized quote mark */}
        <span className="absolute top-2 left-5 text-5xl font-display text-prism-violet/20 select-none leading-none">
          &ldquo;
        </span>

        <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed pl-5 pt-5">
          {aboutData.description}
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div variants={fadeUp} className="flex justify-center gap-3 mt-8">
        {[
          {
            href: "https://github.com/lwinmoepaing",
            icon: <FaGithub size={15} />,
            label: "GitHub",
          },
          {
            href: "https://www.facebook.com/lwin.im/",
            icon: <FaFacebook size={15} />,
            label: "Facebook",
          },
          {
            href: "mailto:lwinmoepaing.dev@gmail.com",
            icon: <FaEnvelope size={14} />,
            label: "Email",
          },
        ].map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-white/5 text-zinc-400 text-xs font-medium hover:text-zinc-100 hover:border-white/10 transition-colors duration-200"
          >
            {link.icon}
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ─── Books Section ──────────────────────────────────────

function BooksSection() {
  const { ref, isInView } = useReveal();

  return (
    <section ref={ref} className="mb-14">
      <SectionHeader title="Published Books" icon="📖" />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="grid gap-4"
      >
        {aboutData.books.map((book, i) => (
          <motion.a
            key={i}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ y: -2 }}
            className="group flex flex-col sm:flex-row gap-4 bg-surface border border-white/5 rounded-2xl p-4 hover:border-prism-violet/15 transition-all duration-300"
          >
            {/* Book cover */}
            <div className="w-full sm:w-28 h-36 sm:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-surface-light relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
              />
            </div>

            {/* Book info */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h3 className="text-[15px] font-display font-semibold text-zinc-100 mb-1.5 group-hover:text-prism-violet transition-colors duration-200">
                {book.title}
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-3 line-clamp-3">
                {book.text}
              </p>
              <span className="inline-flex items-center gap-1.5 text-prism-violet text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <BiLinkExternal size={12} />
                Read on Google Drive
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Awards Section ─────────────────────────────────────

function AwardsSection() {
  const { ref, isInView } = useReveal();

  return (
    <section ref={ref} className="mb-14">
      <SectionHeader title="Awards" icon="🏆" />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {achievementData.awards.map((award, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="group bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-accent-gold/15 transition-all duration-300"
          >
            {/* Award image */}
            <div className="h-36 overflow-hidden bg-surface-light relative">
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
              />
              {/* Gold shimmer overlay on hover */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-display font-semibold text-accent-gold mb-1.5">
                {award.title}
              </h3>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                {award.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Activities Section ─────────────────────────────────

function ActivitiesSection() {
  const { ref, isInView } = useReveal();
  const accents = [
    "border-l-prism-cyan",
    "border-l-prism-violet",
    "border-l-prism-rose",
  ];

  return (
    <section ref={ref} className="mb-14">
      <SectionHeader title="Community & Activities" icon="💡" />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="grid gap-3"
      >
        {achievementData.activities.map((activity, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            className={`bg-surface border border-white/5 rounded-2xl p-5 border-l-2 ${accents[i % accents.length]} hover:bg-surface-light/30 transition-all duration-200 cursor-default`}
          >
            <h3 className="text-sm font-display font-semibold text-zinc-200 mb-1.5">
              {activity.title}
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {activity.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Experience Timeline ────────────────────────────────

function ExperienceTimeline() {
  const { ref, isInView } = useReveal("-40px");

  return (
    <section ref={ref}>
      <SectionHeader title="Experience" icon="💼" />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="relative ml-3 sm:ml-4 pl-7 sm:pl-8"
      >
        {/* Prismatic timeline line */}
        <div className="absolute left-0 top-1 bottom-1 w-px lmp-timeline-line" />

        {expData.map((exp, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="relative mb-5 last:mb-0"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[1.85rem] sm:-left-[2.1rem] top-[18px] w-[9px] h-[9px] rounded-full lmp-timeline-dot border-2 border-obsidian z-10" />

            {/* Experience card */}
            <div className="bg-surface border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-white/[0.08] transition-colors duration-200">
              {/* Company & Position */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-4 mb-1.5">
                <div className="min-w-0">
                  <a
                    href={`https://${exp.companyWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-display font-semibold text-zinc-100 hover:text-prism-cyan transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    {exp.company}
                    <BiLinkExternal size={11} className="text-zinc-600 flex-shrink-0" />
                  </a>
                  <p className="text-xs text-prism-cyan/80">{exp.position}</p>
                </div>
                <span className="text-[11px] text-zinc-600 whitespace-nowrap flex-shrink-0">
                  {exp.date}
                </span>
              </div>

              {/* Project list */}
              {exp.list && exp.list.length > 0 && (
                <div className="mt-2.5 space-y-2">
                  {exp.list.map((item, j) => (
                    <div key={j} className="pl-3 border-l border-white/[0.04]">
                      <p className="text-xs font-medium text-zinc-300">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        {item.para}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Main Component ─────────────────────────────────────

const LwinMoePaing: React.FC = () => {
  return (
    <div className="lmp-profile max-w-2xl mx-auto py-6 sm:py-10">
      <HeroSection />
      <BooksSection />
      <AwardsSection />
      <ActivitiesSection />
      <ExperienceTimeline />
    </div>
  );
};

export default LwinMoePaing;
