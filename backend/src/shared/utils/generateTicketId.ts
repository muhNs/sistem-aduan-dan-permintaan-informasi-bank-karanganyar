import { prisma, Prisma } from "../../../lib/prisma.js";

type TicketPrefix = "REQ" | "COM";
/**
 * FUNGSI INTERNAL (Private)
 * Men-generate kode tiket secara Atomic untuk mencegah Race Condition
 */
const generateTicketCode = async (prefix: TicketPrefix, tx?: Prisma.TransactionClient): Promise<string> => {
  const db = tx || prisma; // Gunakan transaction client jika disediakan, atau fallback ke prisma biasa
  const currentYear = new Date().getFullYear(); // Mengambil tahun saat ini (misal: 2026)
  const sequence = await db.ticketSequence.upsert({
    where: {
      type_year: {
        type: prefix,
        year: currentYear,
      },
    },
    update: {
      lastValue: {
        increment: 1,
      },
    },  
    create: {
      type: prefix,
      year: currentYear,
      lastValue: 1,
    },
  });

  const sequenceString = String(sequence.lastValue).padStart(4, "0");

  // Rangkai menjadi format final: PREFIX-YYYY-XXXX
  return `${prefix}-${currentYear}-${sequenceString}`;
};

/**
 * FUNGSI PUBLIK (Bisa di-import oleh module lain)
 */
export const generateRequestTicket = async (tx?: Prisma.TransactionClient): Promise<string> => {
  return await generateTicketCode("REQ", tx);
};

export const generateComplaintTicket = async (tx?: Prisma.TransactionClient): Promise<string> => {
  return await generateTicketCode("COM", tx);
};
