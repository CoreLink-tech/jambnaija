import { randomBytes } from "node:crypto";

/**
 * Generate a URL-safe unique ID with optional prefix.
 * Not a full cuid, but sufficient and dependency-free.
 */
export function createId(prefix = "id"): string {
  const bytes = randomBytes(12).toString("hex");
  return `${prefix}_${bytes}`;
}

export function createActivationCode(): string {
  // 16 chars, alphanumeric upper for readability
  return randomBytes(10).toString("hex").slice(0, 16).toUpperCase();
}
