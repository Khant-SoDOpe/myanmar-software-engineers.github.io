"use client";

import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format, addDays, startOfDay } from "date-fns";
import { cn } from "@/utils";
import { Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  // Default minDate = tomorrow (can't select today or past)
  const effectiveMinDate = minDate ?? addDays(startOfDay(new Date()), 1);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [
      offset(8),
      flip({ fallbackPlacements: ["top-start", "top-end", "bottom-end"] }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const handleSelect = (date: Date | undefined) => {
    onChange(date ?? null);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        type="button"
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left",
          "bg-white/[0.04] border border-white/[0.08]",
          "hover:border-white/[0.12] transition-all duration-200",
          "focus:outline-none focus:border-prism-cyan/40 focus:ring-1 focus:ring-prism-cyan/20",
          value ? "text-zinc-200" : "text-zinc-600"
        )}
      >
        <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
        <span className="flex-1 truncate">
          {value ? format(value, "MMM d, yyyy") : placeholder}
        </span>
        {value && (
          <span
            onClick={handleClear}
            className="p-0.5 rounded-md hover:bg-white/[0.08] text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}
      </button>

      {/* Calendar dropdown */}
      <AnimatePresence>
        {open && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-[9999]"
            >
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "rounded-2xl overflow-hidden",
                  "bg-surface/95 backdrop-blur-2xl",
                  "border border-white/[0.08]",
                  "shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.05)]",
                  "p-3"
                )}
              >
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-prism-cyan/30 to-transparent mb-2 -mt-1" />
                <DayPicker
                  mode="single"
                  selected={value ?? undefined}
                  onSelect={handleSelect}
                  disabled={{ before: effectiveMinDate }}
                  classNames={{
                    root: "rdp-custom",
                    months: "flex flex-col",
                    month_caption: "flex items-center justify-center py-1",
                    caption_label: "text-sm font-display font-semibold text-zinc-200",
                    nav: "flex items-center gap-1",
                    button_previous: "p-1 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors",
                    button_next: "p-1 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors",
                    weekdays: "flex",
                    weekday: "w-9 text-center text-[10px] font-mono uppercase tracking-wider text-zinc-600 py-1",
                    week: "flex",
                    day: "p-0",
                    day_button: cn(
                      "w-9 h-9 flex items-center justify-center rounded-lg text-sm",
                      "text-zinc-400 hover:text-white hover:bg-white/[0.08]",
                      "transition-all duration-150",
                      "disabled:text-zinc-700 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                    ),
                    selected: "!bg-prism-cyan/20 !text-prism-cyan font-semibold ring-1 ring-prism-cyan/30",
                    today: "font-bold text-white",
                    disabled: "!text-zinc-700 !hover:bg-transparent cursor-not-allowed",
                    outside: "text-zinc-700",
                  }}
                />
              </motion.div>
            </div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </div>
  );
}
