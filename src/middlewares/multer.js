import multer from "multer";


const allowedMime = new Set([
  "image/png",
  "image/jpeg",
  "application/pdf",
]);

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const mime = (file.mimetype || "").toLowerCase();

  const ok = allowedMime.has(mime);

  if (ok) return cb(null, true);
  return cb(new Error("Only PNG/JPG/JPEG images and PDF files are allowed."));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).fields([
  { name: "images", maxCount: 1 },
  { name: "documents", maxCount: 1 },
]);

export default upload;
