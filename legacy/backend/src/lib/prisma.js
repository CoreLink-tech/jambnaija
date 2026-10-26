import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "../env.js";

const globalForPrisma = globalThis;

function createPrismaClient() {
  const options = {
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  };

  const connectionString = String(process.env.DATABASE_URL || "").trim();
  if (connectionString) {
    const sharedPool = globalForPrisma.prismaPool || new Pool({ connectionString });
    globalForPrisma.prismaPool = sharedPool;
    options.adapter = new PrismaPg(sharedPool);
  }

  return new PrismaClient(options);
}

export const prisma =
  globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
