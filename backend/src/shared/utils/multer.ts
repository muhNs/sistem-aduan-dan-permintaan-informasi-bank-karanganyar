// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // 1. Pastikan folder tujuan tersedia, jika belum ada buat otomatis
// // const uploadDir = path.join(__dirname, '../../public/uploads/complaints');
// const uploadDir = path.join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // 2. Atur Penyimpanan (Lokasi & Penamaan File)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     // Buat nama unik: timestamp + random + ekstensi asli (misal: 16912345-4234.pdf)
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, `reply-${uniqueSuffix}${ext}`);
//   },
// });

// // 3. Filter Format File
// const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Format file tidak didukung. Hanya PDF, JPG, atau PNG.'));
//   }
// };

// // 4. Export Middleware
// export const uploadReplyAttachment = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5 MB
//   fileFilter,
// });

import multer from "multer";
import path from "path";
import fs from "fs";

const uploadBaseDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadBaseDir)) {
  fs.mkdirSync(uploadBaseDir, { recursive: true });
}

const attachmentStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadBaseDir);
  },

  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s/g, "_")}`;
    cb(null, uniqueName);
  },
});

const replyStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadBaseDir);
  },

  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s/g, "_")}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage: attachmentStorage,
});

export const uploadReplyAttachment = multer({
  storage: replyStorage,
});
