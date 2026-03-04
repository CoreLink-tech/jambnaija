import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/require-auth.js";

const router = Router();

const createAttemptSchema = z.object({
  subjectId: z.string().trim().min(1),
  mode: z.enum(["STUDY", "CBT"]),
  focusLabel: z.string().trim().optional(),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  percent: z.number().int().min(0).max(100),
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const payload = createAttemptSchema.parse(req.body);

    const attempt = await prisma.attempt.create({
      data: {
        userId: req.user.id,
        subjectId: payload.subjectId,
        mode: payload.mode,
        focusLabel: payload.focusLabel || null,
        score: payload.score,
        total: payload.total,
        percent: payload.percent,
      },
      include: {
        subject: {
          select: { id: true, name: true },
        },
      },
    });

    return res.status(201).json({ attempt });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const limitRaw = Number(req.query.limit || 20);
    const limit = Number.isInteger(limitRaw) ? Math.max(1, Math.min(limitRaw, 100)) : 20;

    const attempts = await prisma.attempt.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        subject: {
          select: { id: true, name: true },
        },
      },
    });

    return res.json({ attempts });
  } catch (error) {
    return next(error);
  }
});

export default router;

