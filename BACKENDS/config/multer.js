import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = file.originalname.toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only jpeg, jpg, png, webp files are allowed!"));
  },
});

export default upload;
