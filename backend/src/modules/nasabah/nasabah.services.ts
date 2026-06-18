import { prisma, Prisma } from "../../../lib/prisma.js";
import { formatWhatsAppNumber } from "../../shared/utils/formatNumberPhone.js";
import type {
  FindOrCreateNasabahInput,
  UpdateNasabahInput,
} from "./nasabah.schema.js";

export const getAllNasabahService = async (
  filters: Prisma.NasabahWhereInput = {},
) => {
  return await prisma.nasabah.findMany({
    where: { deletedAt: null, ...filters },
    include: {
      _count: { select: { complaints: true, informationRequests: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getNasabahByIdService = async (id: number) => {
  const nasabah = await prisma.nasabah.findUnique({
    where: { id },
    include: { complaints: true, informationRequests: true },
  });

  if (!nasabah || nasabah.deletedAt)
    throw new Error("Data Nasabah tidak ditemukan");
  return nasabah;
};

export const updateNasabahService = async (
  id: number,
  data: UpdateNasabahInput,
) => {
  // Lakukan pengecekan apakah nasabah ada sebelum di-update
  await getNasabahByIdService(id);

  return await prisma.nasabah.update({
    where: { id },
    data,
  });
};

export const deleteNasabahService = async (id: number) => {
  await getNasabahByIdService(id);

  return await prisma.nasabah.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const findOrCreateNasabahService = async (
  data: FindOrCreateNasabahInput,
  tx?: Prisma.TransactionClient,
) => {
  const db = tx || prisma; // Gunakan transaction client jika disediakan, atau fallback ke prisma biasa
  let nasabah = await db.nasabah.findFirst({
    where: {
      OR: [
        ...(data.email ? [{ email: data.email }] : []),
        ...(data.phone ? [{ phone: data.phone }] : []),
      ],
      deletedAt: null,
    },
  });

  let phoneNumber = "";
  if (data.phone) {
    phoneNumber = formatWhatsAppNumber(data.phone);
  }

  if (!nasabah) {
    nasabah = await db.nasabah.create({
      data: {
        name: data.name,
        email: data.email ?? null,
        phone: phoneNumber ?? null,
        job: data.job ?? null,
        address: data.address,
      },
    });
  } else {
    nasabah = await db.nasabah.update({
      where: { id: nasabah.id },
      data: { address: data.address, job: data.job ?? null },
    });
  }

  return nasabah;
};
