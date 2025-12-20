import crypto from "crypto";

const MAP = {
  "application/pdf": { folder: "pdf", ext: "pdf" },
  "image/jpeg": { folder: "images", ext: "jpg" },
  "image/png": { folder: "images", ext: "png" },
  "image/webp": { folder: "images", ext: "webp" },
};

function generateS3Key(mimeType) {
  const t = MAP[mimeType];
  if (!t) throw new Error("Unsupported file type");
  return `${t.folder}/${crypto.randomUUID()}.${t.ext}`;
}


export default generateS3Key;