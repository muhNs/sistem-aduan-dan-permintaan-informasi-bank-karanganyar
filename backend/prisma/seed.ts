// prisma/seed.ts
import bcrypt from "bcrypt"; // Pastikan Anda sudah menginstall bcrypt atau bcryptjs
import { prisma } from "../lib/prisma.js";

async function main() {
  console.log("Memulai proses seeding...");

  // 1. Siapkan password yang sudah di-hash (Contoh password: "AdminPassword123!")
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("AdminPassword123!", saltRounds);

  // 2. Gunakan upsert untuk membuat Admin Super
  // Upsert = Update jika email sudah ada, Create jika belum ada.
  const superAdmin = await prisma.user.upsert({
    where: {
      email: "admin@bankkaranganyar.co.id", // Ganti dengan email admin yang Anda inginkan
    },
    update: {}, // Kosongkan jika tidak ingin menimpa data yang sudah ada saat dijalankan ulang
    create: {
      name: "Super Admin",
      email: "admin@bankkaranganyar.co.id",
      password: hashedPassword,
      role: "ADMIN", // Sesuai dengan enum UserRole di schema
    },
  });

  console.log(`✅ Berhasil membuat Super Admin: ${superAdmin.email}`);
  console.log("Seeding selesai.");
}

main()
  .catch((e) => {
    console.error("Terjadi kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Pastikan koneksi database ditutup setelah selesai
    await prisma.$disconnect();
  });
