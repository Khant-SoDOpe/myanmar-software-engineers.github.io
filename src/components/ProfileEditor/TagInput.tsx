"use client";

import Tag from "@/components/Common/Tag/Tag";
import { cn } from "@/utils";
import { Plus } from "lucide-react";
import { KeyboardEvent, useCallback, useRef } from "react";

const TagInput = ({
  tags,
  onAdd,
  onRemove,
}: {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = inputRef.current?.value;
        if (value?.trim()) {
          onAdd(value.trim());
          if (inputRef.current) inputRef.current.value = "";
        }
      }
    },
    [onAdd]
  );

  const handleAddClick = useCallback(() => {
    const value = inputRef.current?.value;
    if (value?.trim()) {
      onAdd(value.trim());
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [onAdd]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a tag and press Enter..."
          onKeyDown={handleKeyDown}
          className={cn(
            "flex-1 bg-obsidian border border-white/[0.08] rounded-lg px-4 py-2.5",
            "text-zinc-200 placeholder:text-zinc-600 font-body text-sm",
            "focus:outline-none focus:border-prism-violet/50 focus:ring-1 focus:ring-prism-violet/20",
            "transition-all duration-200"
          )}
        />
        <button
          type="button"
          onClick={handleAddClick}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg",
            "bg-white/[0.04] border border-white/[0.08]",
            "hover:bg-white/[0.08] hover:border-white/[0.12]",
            "text-zinc-400 hover:text-zinc-200",
            "transition-all duration-200 active:scale-95"
          )}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag
              key={tag}
              tag={tag}
              searchTag=""
              bgColor=""
              isShowClose
              onClick={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
