"use client";

import { cn } from "@/utils";
import Container from "@/components/Common/Container/Container";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowUpRight,
  Calendar,
  PenLine,
  Sparkles,
  Clock3,
  Database,
  FileCode2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

import { useBlogList } from "@/hooks/blog/useBlogList";

/* ── Types ── */
type BlogItem = {
  _id: string;
  title: string;
  description?: string;
  date: string;
  slug: string;
  source?: "static" | "firestore";
  authorName?: string;
  authorPhotoURL?: string;
};

/* ── Floating ambient orbs ── */
const FloatingOrb = ({
  size,
  color,
  x,
  y,
  delay,
  duration,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(50px)",
    }}
    animate={{
      y: [0, -18, 10, -12, 0],
      x: [0, 12, -8, 10, 0],
      scale: [1, 1.12, 0.92, 1.08, 1],
      opacity: [0.2, 0.35, 0.15, 0.3, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* ── Grid decoration ── */
const GridDecoration = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(167, 139, 250, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(167, 139, 250, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

/* ── Prismatic shimmer line ── */
const PrismLine = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute left-0 right-0 h-[1px] pointer-events-none"
    style={{
      top: "35%",
      background:
        "linear-gradient(90deg, transparent 0%, #22d3ee20 20%, #a78bfa30 50%, #fb718520 80%, transparent 100%)",
    }}
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
  />
);

/* ── Floating sparkle particles in hero ── */
const HeroSparkle = ({
  delay,
  x,
  y,
}: {
  delay: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.2, 0.5],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Sparkles className="w-3 h-3 text-prism-violet" />
  </motion.div>
);

/* ── Blog card with cursor-tracking spotlight ── */
const BlogCard = ({
  blog,
  index,
  isInView,
  isFeatured = false,
}: {
  blog: BlogItem;
  index: number;
  isInView: boolean;
  isFeatured?: boolean;
}) => {
  const t = useTranslations("blog");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const spotlightX = useTransform(springX, (v) => `${v}px`);
  const spotlightY = useTransform(springY, (v) => `${v}px`);

  const accentColors = ["#22d3ee", "#a78bfa", "#fb7185", "#fbbf24"];
  const accentColor = isFeatured
    ? "#a78bfa"
    : accentColors[index % accentColors.length];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const date = new Date(blog.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Reading time estimate (rough: ~1min per 200 chars of description)
  const readTime = Math.max(1, Math.ceil((blog.description?.length ?? 80) / 200));

  const SourceIcon = blog.source === "firestore" ? Database : FileCode2;

  return (
    <motion.div
      className={cn(isFeatured && "md:col-span-2 lg:col-span-2")}
      initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 30, scale: 0.97, filter: "blur(4px)" }
      }
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={blog.slug} className="block group h-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={cn(
            "relative h-full rounded-2xl overflow-hidden",
            "bg-surface/60 backdrop-blur-sm",
            "border border-white/[0.06]",
            "transition-all duration-500 ease-out",
            "hover:-translate-y-1.5 hover:border-white/[0.12]",
            "hover:shadow-[0_20px_60px_-15px_rgba(167,139,250,0.12)]",
          )}
        >
          {/* Top accent bar — always visible, colored by accent */}
          <div
            className="h-[2px] w-full"
            style={{
              background: `linear-gradient(90deg, ${accentColor}50, ${accentColor}20, transparent 80%)`,
            }}
          />

          {/* Cursor-following spotlight */}
          <motion.div
            className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              left: spotlightX,
              top: spotlightY,
              width: isFeatured ? 280 : 200,
              height: isFeatured ? 280 : 200,
              x: isFeatured ? -140 : -100,
              y: isFeatured ? -140 : -100,
              background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
            }}
          />

          {/* Corner glow on hover */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className={cn(
            "relative z-10 flex flex-col h-full",
            isFeatured ? "p-7 md:p-8" : "p-5 md:p-6"
          )}>
            {/* Header row: meta badges */}
            <div className="flex items-center flex-wrap gap-2.5 mb-4">
              {/* Date badge */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                <Calendar className="w-3 h-3" style={{ color: accentColor }} />
                {formattedDate}
              </span>

              <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />

              {/* Read time */}
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600">
                <Clock3 className="w-2.5 h-2.5" />
                {readTime} min
              </span>

              <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />

              {/* Source micro badge */}
              <span
                className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-md border"
                style={{
                  color: `${accentColor}90`,
                  background: `${accentColor}06`,
                  borderColor: `${accentColor}15`,
                }}
              >
                <SourceIcon className="w-2.5 h-2.5" />
                {blog.source === "firestore" ? "Community" : "MDX"}
              </span>

              {/* Featured badge */}
              {isFeatured && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
                  style={{
                    background: `${accentColor}10`,
                    border: `1px solid ${accentColor}25`,
                    color: accentColor,
                  }}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  Latest
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className={cn(
                "font-display font-bold tracking-tight text-zinc-100 mb-3",
                "group-hover:text-white transition-colors duration-300",
                isFeatured
                  ? "text-xl md:text-2xl"
                  : "text-base"
              )}
            >
              {blog.title}
            </h2>

            {/* Description */}
            {blog.description && (
              <p
                className={cn(
                  "font-body text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500",
                  isFeatured ? "line-clamp-3 mb-6" : "line-clamp-2 mb-4"
                )}
              >
                {blog.description}
              </p>
            )}

            {/* Separator */}
            <div
              className="h-px w-full mb-4 mt-auto"
              style={{
                background: `linear-gradient(90deg, ${accentColor}10, white/[0.03], transparent)`,
              }}
            />

            {/* Footer: author + read more */}
            <div className="flex items-center justify-between">
              {/* Author */}
              <div className="flex items-center gap-2">
                {blog.authorPhotoURL ? (
                  <img
                    src={blog.authorPhotoURL}
                    alt={blog.authorName ?? ""}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-white/[0.08]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold uppercase ring-1 ring-white/[0.08]"
                    style={{
                      background: `${accentColor}15`,
                      color: `${accentColor}cc`,
                    }}
                  >
                    {(blog.authorName ?? blog.source ?? "M").charAt(0)}
                  </span>
                )}
                {blog.authorName && (
                  <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[100px]">
                    {blog.authorName}
                  </span>
                )}
              </div>

              {/* Read more + index */}
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="font-mono text-xs transition-colors duration-300"
                  style={{ color: `${accentColor}90` }}
                >
                  <span className={mmFont}>{t("readArticle")}</span>
                </span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: accentColor }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Empty state with animation ── */
const EmptyState = ({ isInView, mmFont, t }: { isInView: boolean; mmFont: string; t: ReturnType<typeof useTranslations> }) => (
  <motion.div
    className="relative bg-surface/40 border border-white/[0.06] rounded-2xl py-20 px-8 text-center overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Background glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(167,139,250,0.04) 0%, transparent 70%)",
      }}
    />

    {/* Animated icon */}
    <motion.div
      className="relative mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #a78bfa10, #22d3ee08)",
        border: "1px solid rgba(167,139,250,0.15)",
      }}
      animate={{
        boxShadow: [
          "0 0 0px rgba(167,139,250,0)",
          "0 0 30px rgba(167,139,250,0.12)",
          "0 0 0px rgba(167,139,250,0)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ rotate: [0, -8, 8, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PenLine className="w-7 h-7 text-prism-violet" />
      </motion.div>

      {/* Orbiting dot */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
            boxShadow: "0 0 6px rgba(34,211,238,0.5)",
            top: -4,
            left: "50%",
            marginLeft: -3,
          }}
        />
      </motion.div>
    </motion.div>

    <h3 className={`font-display text-xl font-bold text-zinc-300 mb-2 ${mmFont}`}>
      {t("noPostsTitle")}
    </h3>
    <p className={`font-body text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed ${mmFont}`}>
      {t("noPostsBody")}
    </p>

    {/* Decorative line */}
    <motion.div
      className="mt-8 mx-auto h-[1px] max-w-[120px]"
      style={{
        background:
          "linear-gradient(90deg, transparent, #a78bfa40, transparent)",
      }}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    />
  </motion.div>
);

/* ── Main Blog Page Client ── */
const BlogPageClient = ({ blogs: staticBlogs }: { blogs: BlogItem[] }) => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.3, once: true });
  const gridInView = useInView(gridRef, { amount: 0.1, once: true });
  const t = useTranslations("blog");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  // Merge static + Firestore blogs with pagination
  const { firestoreBlogs, loading: firestoreLoading, hasMore, loadMore, loadingMore } = useBlogList(10);
  const firestoreItems: BlogItem[] = firestoreBlogs.map((p) => ({
    _id: p.id,
    title: p.title,
    description: p.description,
    date: (p.publishedAt ?? p.createdAt).toISOString(),
    slug: `/blog/post?slug=${p.slug}`,
    source: "firestore" as const,
    authorName: p.authorName,
    authorPhotoURL: p.authorPhotoURL,
  }));
  const blogs = [...staticBlogs.map((b) => ({ ...b, source: "static" as const })), ...firestoreItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const hasPosts = blogs.length > 0;
  const [featured, ...rest] = blogs;

  return (
    <div className="relative min-h-[60vh]">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <GridDecoration />
        <FloatingOrb
          size={220}
          color="#22d3ee"
          x="-5%"
          y="5%"
          delay={0}
          duration={9}
        />
        <FloatingOrb
          size={180}
          color="#a78bfa"
          x="80%"
          y="25%"
          delay={1.5}
          duration={11}
        />
        <FloatingOrb
          size={140}
          color="#fb7185"
          x="60%"
          y="70%"
          delay={3}
          duration={8}
        />
        <PrismLine delay={0.4} />
        <HeroSparkle delay={0} x="15%" y="12%" />
        <HeroSparkle delay={1.5} x="85%" y="18%" />
        <HeroSparkle delay={3} x="50%" y="8%" />
      </div>

      {/* Hero header */}
      <div ref={heroRef} className="relative z-10 pt-8 pb-10 md:pt-12 md:pb-14">
        <Container withPadding>
          {/* Section label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={
              heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #a78bfa12, #22d3ee08)",
                border: "1px solid rgba(167,139,250,0.15)",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BookOpen className="w-4 h-4 text-prism-violet" />
            </motion.div>
            <span className={`font-mono text-[11px] text-zinc-500 uppercase tracking-[0.2em] ${mmFont}`}>
              {t("label")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            className={`relative mb-4 ${mmFont ? "" : "overflow-hidden"}`}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
          >
            {/* Shimmer sweep behind title */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.1) 50%, transparent 100%)",
              }}
              initial={{ x: "-100%" }}
              animate={heroInView ? { x: "200%" } : { x: "-100%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.h1
              className={`font-bold text-4xl sm:text-5xl md:text-6xl ${mmFont ? `${mmFont} leading-[1.6] py-2 text-prism-violet` : "font-display leading-[1.15] bg-gradient-to-r from-prism-cyan via-prism-violet to-prism-rose bg-clip-text text-transparent"}`}
              initial={{ y: 50, opacity: 0, filter: "blur(6px)" }}
              animate={
                heroInView
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: 50, opacity: 0, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t("title")}
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className={`font-body text-base text-zinc-500 max-w-lg leading-relaxed ${mmFont}`}
            initial={{ opacity: 0, y: 15 }}
            animate={
              heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          >
            {t("subtitle")}
          </motion.p>

          {/* Post count badge */}
          {hasPosts && (
            <motion.div
              className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-surface/40"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                heroInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-prism-cyan"
                animate={{
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    "0 0 4px rgba(34,211,238,0.6)",
                    "0 0 8px rgba(34,211,238,0.3)",
                    "0 0 4px rgba(34,211,238,0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className={`font-mono text-[10px] text-zinc-500 uppercase tracking-widest ${mmFont}`}>
                {blogs.length} {blogs.length === 1 ? t("article") : t("articles")}
              </span>
            </motion.div>
          )}

          {/* Decorative divider */}
          <motion.div
            className="mt-8 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, #22d3ee15, #a78bfa25, #fb718515, transparent 80%)",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />
        </Container>
      </div>

      {/* Blog grid */}
      <div ref={gridRef} className="relative z-10 pb-16">
        <Container withPadding>
          {firestoreLoading && staticBlogs.length === 0 ? (
            <motion.div
              className="flex items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-prism-violet/30 border-t-prism-violet rounded-full animate-spin" />
                <span className={cn("text-[11px] font-mono text-zinc-600", mmFont)}>
                  Loading blogs...
                </span>
              </div>
            </motion.div>
          ) : !hasPosts ? (
            <EmptyState isInView={gridInView} mmFont={mmFont} t={t} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Featured (latest) post — spans 2 columns */}
              <BlogCard
                blog={featured}
                index={0}
                isInView={gridInView}
                isFeatured={blogs.length > 1}
              />

              {/* Remaining posts */}
              {rest.map((blog, i) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  index={i + 1}
                  isInView={gridInView}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium",
                  "bg-white/[0.04] border border-white/[0.08]",
                  "text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12]",
                  "transition-all duration-300",
                  "disabled:opacity-40 disabled:cursor-not-allowed"
                )}
              >
                {loadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load more posts"
                )}
              </button>
            </motion.div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default BlogPageClient;
