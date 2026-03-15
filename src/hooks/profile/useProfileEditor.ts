"use client";

import { useState, useMemo, useCallback } from "react";

export interface ProfileEditorState {
  name: string;
  description: string;
  image: string;
  tags: string[];
  body: string;
}

const INITIAL_STATE: ProfileEditorState = {
  name: "",
  description: "",
  image: "",
  tags: [],
  body: "",
};

export function useProfileEditor() {
  const [name, setName] = useState(INITIAL_STATE.name);
  const [description, setDescription] = useState(INITIAL_STATE.description);
  const [image, setImage] = useState(INITIAL_STATE.image);
  const [tags, setTags] = useState<string[]>(INITIAL_STATE.tags);
  const [body, setBody] = useState(INITIAL_STATE.body);

  const isValid = name.trim().length > 0;

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    setTags((prev) =>
      prev.some((t) => t.toLowerCase() === trimmed.toLowerCase())
        ? prev
        : [...prev, trimmed]
    );
  }, []);

  const removeTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const mdxOutput = useMemo(() => {
    const lines: string[] = ["---"];
    lines.push(`name: ${name.trim()}`);
    if (description.trim()) {
      lines.push(`description: ${description.trim()}`);
    }
    if (image.trim()) {
      lines.push(`image: "${image.trim()}"`);
    }
    if (tags.length > 0) {
      lines.push("tags:");
      tags.forEach((t) => lines.push(`  - ${t}`));
    }
    lines.push("---");
    lines.push("");
    if (body.trim()) {
      lines.push(body);
    }
    lines.push("");
    return lines.join("\n");
  }, [name, description, image, tags, body]);

  const handleDownload = useCallback(() => {
    if (!isValid) return;
    const blob = new Blob([mdxOutput], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.trim().toLowerCase().replace(/\s+/g, "")}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [mdxOutput, name, isValid]);

  const handleReset = useCallback(() => {
    setName(INITIAL_STATE.name);
    setDescription(INITIAL_STATE.description);
    setImage(INITIAL_STATE.image);
    setTags(INITIAL_STATE.tags);
    setBody(INITIAL_STATE.body);
  }, []);

  return {
    name,
    description,
    image,
    tags,
    body,
    setName,
    setDescription,
    setImage,
    addTag,
    removeTag,
    setBody,
    mdxOutput,
    isValid,
    handleDownload,
    handleReset,
  };
}
