import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
  type DocumentSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import type { AuthUser, BlogPost, BlogPostInput } from "./types";

const COLLECTION = "blog_posts";
const DEFAULT_PAGE_SIZE = 6;
const DAILY_PUBLISH_LIMIT = 3;

export interface PaginatedResult<T> {
  data: T[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  const suffix = Date.now().toString(36);
  return `${base}-${suffix}`;
}

function toDate(ts: Timestamp | null | undefined): Date | null {
  if (!ts) return null;
  return ts.toDate();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToBlogPost(id: string, data: any): BlogPost {
  return {
    id,
    title: data.title ?? "",
    description: data.description ?? "",
    content: data.content,
    authorId: data.authorId ?? "",
    authorName: data.authorName ?? "",
    authorPhotoURL: data.authorPhotoURL ?? "",
    status: data.status ?? "draft",
    tags: data.tags ?? [],
    coverImageURL: data.coverImageURL ?? null,
    slug: data.slug ?? "",
    createdAt: toDate(data.createdAt) ?? new Date(),
    updatedAt: toDate(data.updatedAt) ?? new Date(),
    publishedAt: toDate(data.publishedAt),
  };
}

export async function createBlogPost(
  input: BlogPostInput,
  user: AuthUser
): Promise<string> {
  const slug = slugify(input.title);
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    authorId: user.uid,
    authorName: user.displayName ?? "",
    authorPhotoURL: user.photoURL ?? "",
    status: "draft",
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: null,
  });
  return docRef.id;
}

export async function updateBlogPost(
  id: string,
  input: Partial<BlogPostInput>
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogPost(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return docToBlogPost(snap.id, snap.data());
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const q = query(
    collection(db, COLLECTION),
    where("slug", "==", slug),
    where("status", "==", "published")
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const first = snap.docs[0];
  return docToBlogPost(first.id, first.data());
}

export async function getPublishedBlogPosts(
  pageSize = DEFAULT_PAGE_SIZE,
  cursor?: DocumentSnapshot | null
): Promise<PaginatedResult<BlogPost>> {
  const ref = collection(db, COLLECTION);
  const q = cursor
    ? query(ref, where("status", "==", "published"), orderBy("publishedAt", "desc"), startAfter(cursor), limit(pageSize + 1))
    : query(ref, where("status", "==", "published"), orderBy("publishedAt", "desc"), limit(pageSize + 1));

  const snap = await getDocs(q);
  const docs = snap.docs;
  const hasMore = docs.length > pageSize;
  const sliced = hasMore ? docs.slice(0, pageSize) : docs;

  return {
    data: sliced.map((d) => docToBlogPost(d.id, d.data())),
    lastDoc: sliced.length > 0 ? sliced[sliced.length - 1] : null,
    hasMore,
  };
}

export async function getUserDrafts(
  uid: string,
  pageSize = DEFAULT_PAGE_SIZE,
  cursor?: DocumentSnapshot | null
): Promise<PaginatedResult<BlogPost>> {
  const ref = collection(db, COLLECTION);
  const q = cursor
    ? query(ref, where("authorId", "==", uid), orderBy("updatedAt", "desc"), startAfter(cursor), limit(pageSize + 1))
    : query(ref, where("authorId", "==", uid), orderBy("updatedAt", "desc"), limit(pageSize + 1));

  const snap = await getDocs(q);
  const docs = snap.docs;
  const hasMore = docs.length > pageSize;
  const sliced = hasMore ? docs.slice(0, pageSize) : docs;

  return {
    data: sliced.map((d) => docToBlogPost(d.id, d.data())),
    lastDoc: sliced.length > 0 ? sliced[sliced.length - 1] : null,
    hasMore,
  };
}

/**
 * Count how many posts a user published today.
 */
export async function getUserDailyPublishCount(uid: string): Promise<number> {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startTs = Timestamp.fromDate(startOfDay);

  const ref = collection(db, COLLECTION);
  const q = query(
    ref,
    where("authorId", "==", uid),
    where("status", "==", "published"),
    where("publishedAt", ">=", startTs)
  );
  const snap = await getDocs(q);
  return snap.size;
}

/**
 * Publish a blog post. Enforces daily limit per user (admin bypasses).
 * Throws an error if the user has exceeded their daily publish limit.
 */
export async function publishBlogPost(
  id: string,
  uid: string,
  isAdmin = false
): Promise<void> {
  if (!isAdmin) {
    const todayCount = await getUserDailyPublishCount(uid);
    if (todayCount >= DAILY_PUBLISH_LIMIT) {
      throw new Error(
        `Daily publish limit reached (${DAILY_PUBLISH_LIMIT} posts/day). Try again tomorrow.`
      );
    }
  }

  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    status: "published",
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function unpublishBlogPost(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    status: "draft",
    publishedAt: null,
    updatedAt: serverTimestamp(),
  });
}
