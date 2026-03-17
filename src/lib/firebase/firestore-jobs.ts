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
import type { AuthUser, JobPost, JobPostInput } from "./types";
import type { PaginatedResult } from "./firestore";

const COLLECTION = "job_posts";
const DEFAULT_PAGE_SIZE = 6;

function slugify(text: string): string {
  const base = text
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore doc data
function docToJobPost(id: string, data: any): JobPost {
  return {
    id,
    position: data.position ?? "",
    tag: data.tag ?? "",
    skills: data.skills ?? [],
    description: data.description,
    officeEmail: data.officeEmail ?? "",
    expiredAt: toDate(data.expiredAt),
    authorId: data.authorId ?? "",
    authorName: data.authorName ?? "",
    authorPhotoURL: data.authorPhotoURL ?? "",
    status: data.status ?? "draft",
    slug: data.slug ?? "",
    createdAt: toDate(data.createdAt) ?? new Date(),
    updatedAt: toDate(data.updatedAt) ?? new Date(),
    publishedAt: toDate(data.publishedAt),
  };
}

export async function createJobPost(
  input: JobPostInput,
  user: AuthUser
): Promise<string> {
  const slug = slugify(input.position);
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    expiredAt: input.expiredAt ? Timestamp.fromDate(input.expiredAt) : null,
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

export async function updateJobPost(
  id: string,
  input: Partial<JobPostInput>
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  const { expiredAt, ...rest } = input;
  await updateDoc(ref, {
    ...rest,
    ...(expiredAt !== undefined && {
      expiredAt: expiredAt ? Timestamp.fromDate(expiredAt) : null,
    }),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteJobPost(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getJobPost(id: string): Promise<JobPost | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return docToJobPost(snap.id, snap.data());
}

export async function getJobPostBySlug(
  slug: string
): Promise<JobPost | null> {
  const q = query(
    collection(db, COLLECTION),
    where("slug", "==", slug),
    where("status", "==", "published")
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const first = snap.docs[0];
  return docToJobPost(first.id, first.data());
}

export async function getPublishedJobPosts(
  pageSize = DEFAULT_PAGE_SIZE,
  cursor?: DocumentSnapshot | null
): Promise<PaginatedResult<JobPost>> {
  const ref = collection(db, COLLECTION);
  const q = cursor
    ? query(ref, where("status", "==", "published"), orderBy("publishedAt", "desc"), startAfter(cursor), limit(pageSize + 1))
    : query(ref, where("status", "==", "published"), orderBy("publishedAt", "desc"), limit(pageSize + 1));

  const snap = await getDocs(q);
  const docs = snap.docs;
  const hasMore = docs.length > pageSize;
  const sliced = hasMore ? docs.slice(0, pageSize) : docs;

  return {
    data: sliced.map((d) => docToJobPost(d.id, d.data())),
    lastDoc: sliced.length > 0 ? sliced[sliced.length - 1] : null,
    hasMore,
  };
}

export async function getUserJobPosts(
  uid: string,
  pageSize = DEFAULT_PAGE_SIZE,
  cursor?: DocumentSnapshot | null
): Promise<PaginatedResult<JobPost>> {
  const ref = collection(db, COLLECTION);
  const q = cursor
    ? query(ref, where("authorId", "==", uid), orderBy("updatedAt", "desc"), startAfter(cursor), limit(pageSize + 1))
    : query(ref, where("authorId", "==", uid), orderBy("updatedAt", "desc"), limit(pageSize + 1));

  const snap = await getDocs(q);
  const docs = snap.docs;
  const hasMore = docs.length > pageSize;
  const sliced = hasMore ? docs.slice(0, pageSize) : docs;

  return {
    data: sliced.map((d) => docToJobPost(d.id, d.data())),
    lastDoc: sliced.length > 0 ? sliced[sliced.length - 1] : null,
    hasMore,
  };
}

const DAILY_PUBLISH_LIMIT = 3;

export async function getUserDailyJobPublishCount(uid: string): Promise<number> {
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

export async function publishJobPost(
  id: string,
  uid: string,
  isAdmin = false
): Promise<void> {
  if (!isAdmin) {
    const todayCount = await getUserDailyJobPublishCount(uid);
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

export async function unpublishJobPost(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    status: "draft",
    publishedAt: null,
    updatedAt: serverTimestamp(),
  });
}
