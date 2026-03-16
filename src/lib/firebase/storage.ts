import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function uploadBlogImage(
  file: File,
  postId: string
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}.${ext}`;
  const storageRef = ref(storage, `blog-images/${postId}/${filename}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
