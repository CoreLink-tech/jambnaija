import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address.");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters.")
  .max(128, "Password is too long.");

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^[a-z0-9._-]{3,30}$/,
    "Username must be 3–30 characters (letters, numbers, ., _, -).",
  );

export const deviceIdSchema = z
  .string()
  .trim()
  .min(8, "Invalid device identifier.")
  .max(128, "Invalid device identifier.");

export const studentRegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  deviceId: deviceIdSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  deviceId: deviceIdSchema.optional(),
});

export const activationCodeSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(10)
  .max(80);

export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
