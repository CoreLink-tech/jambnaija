import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

/**
 * SQLite / Turso-compatible schema derived from the audited Prisma models.
 * - Enums become text columns with application-level validation.
 * - JSON options stored as text (JSON.stringify / parse).
 * - CUID-style string IDs preserved for portability.
 * - Attempt answers stored separately so historical results remain correct
 *   even if a question is later edited.
 */

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    username: text("username"),
    passwordHash: text("password_hash").notNull(),
    role: text("role", { enum: ["STUDENT", "ADMIN"] })
      .notNull()
      .default("STUDENT"),
    status: text("status", {
      enum: ["PENDING", "ACTIVE", "DEACTIVATED"],
    })
      .notNull()
      .default("PENDING"),
    planTier: text("plan_tier", { enum: ["STANDARD", "PREMIUM"] }),
    trialPremiumEndsAt: integer("trial_premium_ends_at", { mode: "timestamp" }),
    deviceId: text("device_id"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
    uniqueIndex("users_username_unique").on(table.username),
    uniqueIndex("users_device_id_unique").on(table.deviceId),
    index("users_role_status_idx").on(table.role, table.status),
  ],
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    index("sessions_user_id_idx").on(table.userId),
    index("sessions_expires_at_idx").on(table.expiresAt),
  ],
);

export const activationCodes = sqliteTable(
  "activation_codes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    code: text("code").notNull(),
    tier: text("tier", { enum: ["STANDARD", "PREMIUM"] }).notNull(),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdById: text("created_by_id"),
    usedById: text("used_by_id"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    usedAt: integer("used_at", { mode: "timestamp" }),
  },
  (table) => [
    uniqueIndex("activation_codes_code_unique").on(table.code),
    index("activation_codes_tier_active_idx").on(
      table.tier,
      table.isActive,
      table.createdAt,
    ),
    index("activation_codes_used_by_idx").on(table.usedById),
    index("activation_codes_created_by_idx").on(table.createdById),
  ],
);

export const subjects = sqliteTable(
  "subjects",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [uniqueIndex("subjects_name_unique").on(table.name)],
);

export const topics = sqliteTable(
  "topics",
  {
    id: text("id").primaryKey(),
    subjectId: text("subject_id")
      .notNull()
      .references(() => subjects.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    uniqueIndex("topics_subject_name_unique").on(table.subjectId, table.name),
    index("topics_subject_id_idx").on(table.subjectId),
  ],
);

export const questions = sqliteTable(
  "questions",
  {
    id: text("id").primaryKey(),
    subjectId: text("subject_id")
      .notNull()
      .references(() => subjects.id, { onDelete: "cascade" }),
    topicId: text("topic_id").references(() => topics.id, {
      onDelete: "set null",
    }),
    mode: text("mode", { enum: ["STUDY", "CBT"] }).notNull(),
    prompt: text("prompt").notNull(),
    /** JSON array of option strings */
    options: text("options", { mode: "json" }).$type<string[]>().notNull(),
    answerIndex: integer("answer_index").notNull(),
    explanation: text("explanation"),
    year: integer("year"),
    exam: text("exam"),
    /** Stable content ID for bundled questions (Phase 4+) */
    contentId: text("content_id"),
    source: text("source"),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    index("questions_subject_mode_idx").on(table.subjectId, table.mode),
    index("questions_mode_year_exam_idx").on(table.mode, table.year, table.exam),
    index("questions_topic_id_idx").on(table.topicId),
    uniqueIndex("questions_content_id_unique").on(table.contentId),
  ],
);

export const attempts = sqliteTable(
  "attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    subjectId: text("subject_id")
      .notNull()
      .references(() => subjects.id, { onDelete: "cascade" }),
    mode: text("mode", { enum: ["STUDY", "CBT"] }).notNull(),
    focusLabel: text("focus_label"),
    score: integer("score").notNull(),
    total: integer("total").notNull(),
    percent: integer("percent").notNull(),
    /** Server-authoritative deadline for CBT (unix seconds) */
    deadlineAt: integer("deadline_at", { mode: "timestamp" }),
    submittedAt: integer("submitted_at", { mode: "timestamp" }),
    status: text("status", {
      enum: ["IN_PROGRESS", "SUBMITTED", "ABANDONED", "EXPIRED"],
    })
      .notNull()
      .default("IN_PROGRESS"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    index("attempts_user_created_idx").on(table.userId, table.createdAt),
    index("attempts_subject_created_idx").on(table.subjectId, table.createdAt),
    index("attempts_status_idx").on(table.status),
  ],
);

/**
 * Per-answer snapshot so later question edits cannot change historical results.
 */
export const attemptAnswers = sqliteTable(
  "attempt_answers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    attemptId: text("attempt_id")
      .notNull()
      .references(() => attempts.id, { onDelete: "cascade" }),
    questionId: text("question_id"),
    /** Snapshot of prompt/options/correct at time of attempt */
    promptSnapshot: text("prompt_snapshot").notNull(),
    optionsSnapshot: text("options_snapshot", { mode: "json" })
      .$type<string[]>()
      .notNull(),
    correctIndex: integer("correct_index").notNull(),
    selectedIndex: integer("selected_index"),
    isCorrect: integer("is_correct", { mode: "boolean" }),
    orderIndex: integer("order_index").notNull().default(0),
  },
  (table) => [
    index("attempt_answers_attempt_idx").on(table.attemptId),
    index("attempt_answers_question_idx").on(table.questionId),
  ],
);

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    actorId: text("actor_id"),
    action: text("action").notNull(),
    entityType: text("entity_type"),
    entityId: text("entity_id"),
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    index("audit_logs_actor_idx").on(table.actorId),
    index("audit_logs_entity_idx").on(table.entityType, table.entityId),
    index("audit_logs_created_idx").on(table.createdAt),
  ],
);

// Relations (for typed queries)
export const usersRelations = relations(users, ({ many }) => ({
  attempts: many(attempts),
  sessions: many(sessions),
  generatedCodes: many(activationCodes, { relationName: "createdBy" }),
  redeemedCodes: many(activationCodes, { relationName: "usedBy" }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const activationCodesRelations = relations(activationCodes, ({ one }) => ({
  createdBy: one(users, {
    fields: [activationCodes.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  usedBy: one(users, {
    fields: [activationCodes.usedById],
    references: [users.id],
    relationName: "usedBy",
  }),
}));

export const subjectsRelations = relations(subjects, ({ many }) => ({
  topics: many(topics),
  questions: many(questions),
  attempts: many(attempts),
}));

export const topicsRelations = relations(topics, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [topics.subjectId],
    references: [subjects.id],
  }),
  questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  subject: one(subjects, {
    fields: [questions.subjectId],
    references: [subjects.id],
  }),
  topic: one(topics, {
    fields: [questions.topicId],
    references: [topics.id],
  }),
}));

export const attemptsRelations = relations(attempts, ({ one, many }) => ({
  user: one(users, {
    fields: [attempts.userId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [attempts.subjectId],
    references: [subjects.id],
  }),
  answers: many(attemptAnswers),
}));

export const attemptAnswersRelations = relations(attemptAnswers, ({ one }) => ({
  attempt: one(attempts, {
    fields: [attemptAnswers.attemptId],
    references: [attempts.id],
  }),
}));
