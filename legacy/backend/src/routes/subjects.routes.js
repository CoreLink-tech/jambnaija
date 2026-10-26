import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const includeQuestions = String(req.query.includeQuestions || "") === "1";

    const subjects = await prisma.subject.findMany({
      orderBy: { name: "asc" },
      include: {
        topics: {
          orderBy: { name: "asc" },
          select: { id: true, name: true },
        },
        questions: {
          orderBy: { createdAt: "desc" },
          select: includeQuestions
            ? {
                id: true,
                mode: true,
                prompt: true,
                options: true,
                answerIndex: true,
                explanation: true,
                year: true,
                exam: true,
                topicId: true,
              }
            : {
                id: true,
                mode: true,
                year: true,
                exam: true,
                topicId: true,
              },
        },
      },
    });

    const data = subjects.map((subject) => {
      const studyCount = subject.questions.filter((item) => item.mode === "STUDY").length;
      const cbtQuestions = subject.questions.filter((item) => item.mode === "CBT");
      const cbtCount = cbtQuestions.length;
      const pastSets = [
        ...new Set(
          cbtQuestions
            .filter((item) => Number.isInteger(item.year))
            .map((item) => `${item.year} ${item.exam || "JAMB"}`)
        ),
      ];

      return {
        id: subject.id,
        name: subject.name,
        description: subject.description,
        topics: subject.topics,
        counts: {
          total: subject.questions.length,
          study: studyCount,
          cbt: cbtCount,
          pastSets: pastSets.length,
        },
        pastSets,
        questions: includeQuestions ? subject.questions : undefined,
        updatedAt: subject.updatedAt,
      };
    });

    return res.json({ subjects: data });
  } catch (error) {
    return next(error);
  }
});

export default router;

