"use client";

import Tag from "@/components/Common/Tag/Tag";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

export type TProfileCardItem = {
  _id: string;
  slugAsParams: string;
  image?: string;
  name: string;
  tags?: string[];
  description?: string;
  searchTag?: string;
  handleSearchTag?: (tag: string) => void;
};

/* Deterministic accent from name — keeps each card unique */
const CARD_ACCENTS = [
  { from: "#22d3ee", to: "#a78bfa" }, // cyan → violet
  { from: "#a78bfa", to: "#fb7185" }, // violet → rose
  { from: "#fb7185", to: "#fbbf24" }, // rose → amber
  { from: "#34d399", to: "#22d3ee" }, // emerald → cyan
  { from: "#60a5fa", to: "#a78bfa" }, // blue → violet
  { from: "#c084fc", to: "#fb7185" }, // purple → rose
  { from: "#fbbf24", to: "#fb923c" }, // amber → orange
  { from: "#2dd4bf", to: "#60a5fa" }, // teal → blue
] as const;

const hashName = (name: string): number => {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h << 5) - h + name.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) % CARD_ACCENTS.length;
};

/* ── Floating dev icon SVG paths (16×16 viewBox) ── */
const DEV_ICONS = [
  // Code brackets  </>
  "M4.5 3L1 8l3.5 5M11.5 3L15 8l-3.5 5M9 2L7 14",
  // Terminal  >_
  "M2 3h12v10H2zM5 7l2 1.5L5 10M9 10h3",
  // Git branch
  "M5 3v5a3 3 0 003 3h0a3 3 0 003-3V3M5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM11 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 14a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  // Database
  "M2 4c0-1.7 2.7-3 6-3s6 1.3 6 3M2 4v3c0 1.7 2.7 3 6 3s6-1.3 6-3V4M2 7v3c0 1.7 2.7 3 6 3s6-1.3 6-3V7",
  // CPU / chip
  "M4 4h8v8H4zM6 1v3M10 1v3M6 12v3M10 12v3M1 6h3M1 10h3M12 6h3M12 10h3",
  // Cloud
  "M4 12h8a3 3 0 000-6h-.2A4 4 0 004 7a3 3 0 000 5z",
  // Bug
  "M5 4a3 3 0 016 0M5 4H3M11 4h2M4 8h8M3 6l1 2M13 6l-1 2M3 12l2-2M13 12l-2-2M8 8v5",
  // Lightning bolt
  "M8.5 1L3 9h4.5L6.5 15 13 7H8.5z",
  // Puzzle piece
  "M3 6h2a2 2 0 110 4H3v3h3v-2a2 2 0 114 0v2h3V6h-2a2 2 0 110-4h2V2H3z",
  // Brackets { }
  "M5 2C3.5 2 3 3 3 4.5v2C3 7.5 2 8 1 8c1 0 2 .5 2 1.5v2C3 13 3.5 14 5 14M11 2c1.5 0 2 1 2 2.5v2c0 1 1 1.5 2 1.5-1 0-2 .5-2 1.5v2c0 1.5-.5 2.5-2 2.5",
] as const;

/* Placement presets — 3 icons per card, deterministic positions */
const ICON_PLACEMENTS: readonly { top: string; left: string; size: number; rotate: number; delay: string }[] = [
  { top: "12%", left: "auto", size: 18, rotate: -15, delay: "0s" },
  { top: "auto", left: "6%", size: 14, rotate: 20, delay: "2s" },
  { top: "55%", left: "auto", size: 12, rotate: -8, delay: "4s" },
];

/* Pick 3 icon indices from a name hash, spread across the set */
const getIconIndices = (name: string): number[] => {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) | 0;
  }
  const a = Math.abs(h) % DEV_ICONS.length;
  const b = Math.abs(h * 7 + 13) % DEV_ICONS.length;
  const c = Math.abs(h * 11 + 29) % DEV_ICONS.length;
  return [a, b, c];
};

const ProfileCardItem = ({
  _id,
  slugAsParams,
  name,
  description,
  image,
  tags,
  searchTag,
  handleSearchTag,
}: TProfileCardItem) => {
  const accent = CARD_ACCENTS[hashName(name)];
  const iconIndices = getIconIndices(name);
  const [imgError, setImgError] = useState(false);
  const onImgError = useCallback(() => setImgError(true), []);

  return (
    <div key={_id} className="self-stretch animate-fadein">
      <Link href={`/profile/${slugAsParams}`}>
        <div
          className={cn(
            "profile-card group relative w-full h-full min-h-[130px]",
            "rounded-2xl overflow-hidden",
            "border border-white/[0.06] hover:border-white/[0.12]",
            "transition-all duration-300 ease-out cursor-pointer",
            "hover:-translate-y-1"
          )}
          style={{
            background: `
              linear-gradient(135deg, ${accent.from}03 0%, transparent 40%, ${accent.to}03 100%),
              linear-gradient(180deg, #1a1a22 0%, #151520 100%)
            `,
          }}
        >
          {/* ── Background layers ── */}

          {/* Fine dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)`,
              backgroundSize: "16px 16px",
            }}
          />

          {/* Floating dev icons */}
          {iconIndices.map((iconIdx, i) => {
            const p = ICON_PLACEMENTS[i];
            const isRight = i !== 1; // 0 and 2 are right-aligned
            return (
              <svg
                key={i}
                className="card-float-icon absolute pointer-events-none opacity-[0.25] group-hover:opacity-[0.5] transition-opacity duration-700"
                width={p.size}
                height={p.size}
                viewBox="0 0 16 16"
                fill="none"
                stroke={i % 2 === 0 ? accent.from : accent.to}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  top: p.top,
                  bottom: i === 1 ? "18%" : "auto",
                  left: isRight ? "auto" : p.left,
                  right: isRight ? (i === 0 ? "8%" : "14%") : "auto",
                  ["--icon-rotate" as string]: `rotate(${p.rotate}deg)`,
                  transform: `rotate(${p.rotate}deg)`,
                  animationDelay: p.delay,
                }}
              >
                <path d={DEV_ICONS[iconIdx]} />
              </svg>
            );
          })}

          {/* Diagonal accent streak — static, faint */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025] group-hover:opacity-[0.06] transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${accent.from}40 45%, ${accent.to}30 55%, transparent 70%)`,
            }}
          />

          {/* Top-left orb glow — always visible, intensifies on hover */}
          <div
            className="absolute -top-16 -left-16 w-40 h-40 pointer-events-none opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accent.from}, transparent 70%)`,
            }}
          />

          {/* Bottom-right orb glow */}
          <div
            className="absolute -bottom-12 -right-12 w-36 h-36 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accent.to}, transparent 70%)`,
            }}
          />

          {/* Top accent line — gradient unique per card */}
          <div
            className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent.from}80, ${accent.to}80, transparent)`,
            }}
          />

          {/* Inner edge highlight — top */}
          <div
            className="absolute top-0 inset-x-0 h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.04) 50%, transparent 80%)",
            }}
          />

          {/* ── Content ── */}
          <div className="relative z-[1] p-5">
            {/* Header: Avatar + Name */}
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar with gradient ring */}
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-[2px] rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                  }}
                />
                <div
                  className={cn(
                    "relative flex justify-center items-center w-11 h-11 rounded-full overflow-hidden",
                    "bg-surface-light border-2 border-surface"
                  )}
                >
                  {image && !imgError ? (
                    <Image
                      src={image}
                      className="object-cover"
                      alt={name}
                      width={44}
                      height={44}
                      onError={onImgError}
                    />
                  ) : (
                    <span
                      className="text-lg font-display font-semibold"
                      style={{ color: accent.from }}
                    >
                      {name?.trim()?.[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <h4 className="font-display tracking-tight text-base text-zinc-100 truncate group-hover:text-white transition-colors duration-200">
                  {name}
                </h4>
              </div>

              {/* Hover arrow */}
              <span className="shrink-0 text-zinc-600 group-hover:text-zinc-400 translate-x-0 group-hover:translate-x-0.5 transition-all duration-200 opacity-0 group-hover:opacity-100">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </span>
            </div>

            {/* Tags */}
            <div className="mb-2.5">
              {tags?.map((tag) => (
                <Tag
                  key={tag}
                  tag={tag}
                  searchTag={searchTag ?? ""}
                  bgColor=""
                  onClick={handleSearchTag}
                />
              ))}
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200 font-body leading-relaxed line-clamp-3">
                {description}
              </p>
            )}
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 inset-x-0 h-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent 10%, ${accent.from}40, ${accent.to}40, transparent 90%)`,
            }}
          />
        </div>
      </Link>
    </div>
  );
};
export default ProfileCardItem;
