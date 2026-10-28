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

export const phoneSchema = z
  .string()
  .trim()
  .min(10, "Enter a valid phone number.")
  .max(20, "Phone number is too long.")
  .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number.");

export const studentRegisterSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    username: usernameSchema,
    deviceId: deviceIdSchema,
    phone: phoneSchema,
    age: z.number().int().min(10).max(120),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions." }),
    }),
    guardianConsent: z.boolean().optional(),
    referralCode: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.age < 18 && data.guardianConsent !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "If you are under 18, you must confirm that your guardian has consented.",
        path: ["guardianConsent"],
      });
    }
  });

/** Student portal: email or username + password */
export const loginSchema = z.object({
  identifier: z.string().trim().min(3, "Enter your email or username."),
  password: passwordSchema,
  deviceId: deviceIdSchema.optional(),
});

/** Admin portal: email only */
export const adminLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const activationCodeSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(10)
  .max(80);

export const withdrawalSchema = z.object({
  amount: z.number().int().positive(),
  accountNumber: z.string().trim().min(8).max(20),
  accountName: z.string().trim().min(2).max(80),
});

export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const SUBSCRIPTION_PRICE_NGN = 2000;
export const REFERRAL_REWARD_NGN = 500;
