import { createId } from "@/lib/security/id";
import { ValidationError, NotFoundError, AppError } from "@/lib/errors";
import {
  subjectCreateSchema,
  topicCreateSchema,
  type SubjectCreateInput,
  type TopicCreateInput,
} from "@/lib/validation/questions";
import * as subjectRepo from "@/server/repositories/subjects";
import { requireAdminSession } from "@/server/policies/auth";

export async function getSubjectsCatalog() {
  return subjectRepo.listSubjectsWithCounts();
}

export async function adminCreateSubject(raw: SubjectCreateInput) {
  await requireAdminSession();
  const parsed = subjectCreateSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid subject data.", parsed.error.flatten());
  }
  const id = createId("sub");
  const created = await subjectRepo.createSubject({
    id,
    name: parsed.data.name,
    description: parsed.data.description,
  });
  return created;
}

export async function adminDeleteSubject(id: string) {
  await requireAdminSession();
  const existing = await subjectRepo.getSubjectById(id);
  if (!existing) throw new NotFoundError("Subject not found.");
  await subjectRepo.deleteSubject(id);
}

export async function getSubjectTopics(subjectId: string) {
  const subject = await subjectRepo.getSubjectById(subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");
  return subjectRepo.listTopicsForSubject(subjectId);
}

export async function adminCreateTopic(raw: TopicCreateInput) {
  await requireAdminSession();
  const parsed = topicCreateSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid topic data.", parsed.error.flatten());
  }
  const subject = await subjectRepo.getSubjectById(parsed.data.subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");

  const existing = await subjectRepo.findTopicByName(
    parsed.data.subjectId,
    parsed.data.name,
  );
  if (existing) {
    throw new AppError("Topic already exists on this subject.", "TOPIC_EXISTS", 409);
  }

  const id = createId("top");
  return subjectRepo.createTopic({
    id,
    subjectId: parsed.data.subjectId,
    name: parsed.data.name,
  });
}

export async function adminDeleteTopic(id: string) {
  await requireAdminSession();
  await subjectRepo.deleteTopic(id);
}
