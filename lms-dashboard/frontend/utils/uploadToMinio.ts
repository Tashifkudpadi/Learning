// utils/uploadToMinio.ts
export async function uploadToMinio(file: File, objectName?: string) {
  const uniqueName =
    objectName || `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;

  // 1️⃣ Request presigned URL from FastAPI
  const res = await fetch(
    `http://127.0.0.1:8000/course-contents/upload-url?file_name=${encodeURIComponent(
      uniqueName
    )}&content_type=${encodeURIComponent(file.type || "application/octet-stream")}`
  );
  if (!res.ok) {
    throw new Error("Failed to get presigned upload URL");
  }
  const { upload_url } = await res.json();

  // 2️⃣ Upload directly to MinIO
  const uploadRes = await fetch(upload_url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file to MinIO");
  }

  // 3️⃣ Return object name and a convenience URL (bucket must be public to use this URL directly)
  const fileUrl = `http://localhost:9000/course-content/${encodeURIComponent(uniqueName)}`;
  return { objectName: uniqueName, fileUrl };
}
