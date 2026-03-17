import type { SerializedEditorState } from "lexical";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "admin" | "user";
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: SerializedEditorState;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  status: "draft" | "published";
  tags: string[];
  coverImageURL: string | null;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface BlogPostInput {
  title: string;
  description: string;
  content: SerializedEditorState;
  tags: string[];
  coverImageURL: string | null;
}

export interface JobPost {
  id: string;
  position: string;
  tag: string;
  skills: string[];
  description: SerializedEditorState;
  officeEmail: string;
  expiredAt: Date | null;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  status: "draft" | "published";
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface JobPostInput {
  position: string;
  tag: string;
  skills: string[];
  description: SerializedEditorState;
  officeEmail: string;
  expiredAt: Date | null;
}
