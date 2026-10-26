CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'STUDENT' NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`plan_tier` text,
	`trial_premium_ends_at` integer,
	`device_id` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_device_id_unique` ON `users` (`device_id`);
--> statement-breakpoint
CREATE INDEX `users_role_status_idx` ON `users` (`role`,`status`);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `sessions_user_id_idx` ON `sessions` (`user_id`);
--> statement-breakpoint
CREATE INDEX `sessions_expires_at_idx` ON `sessions` (`expires_at`);
--> statement-breakpoint
CREATE TABLE `activation_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`tier` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_by_id` text,
	`used_by_id` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`used_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `activation_codes_code_unique` ON `activation_codes` (`code`);
--> statement-breakpoint
CREATE INDEX `activation_codes_tier_active_idx` ON `activation_codes` (`tier`,`is_active`,`created_at`);
--> statement-breakpoint
CREATE INDEX `activation_codes_used_by_idx` ON `activation_codes` (`used_by_id`);
--> statement-breakpoint
CREATE INDEX `activation_codes_created_by_idx` ON `activation_codes` (`created_by_id`);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subjects_name_unique` ON `subjects` (`name`);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_id` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `topics_subject_name_unique` ON `topics` (`subject_id`,`name`);
--> statement-breakpoint
CREATE INDEX `topics_subject_id_idx` ON `topics` (`subject_id`);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_id` text NOT NULL,
	`topic_id` text,
	`mode` text NOT NULL,
	`prompt` text NOT NULL,
	`options` text NOT NULL,
	`answer_index` integer NOT NULL,
	`explanation` text,
	`year` integer,
	`exam` text,
	`content_id` text,
	`source` text,
	`published` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `questions_subject_mode_idx` ON `questions` (`subject_id`,`mode`);
--> statement-breakpoint
CREATE INDEX `questions_mode_year_exam_idx` ON `questions` (`mode`,`year`,`exam`);
--> statement-breakpoint
CREATE INDEX `questions_topic_id_idx` ON `questions` (`topic_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `questions_content_id_unique` ON `questions` (`content_id`);
--> statement-breakpoint
CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`subject_id` text NOT NULL,
	`mode` text NOT NULL,
	`focus_label` text,
	`score` integer NOT NULL,
	`total` integer NOT NULL,
	`percent` integer NOT NULL,
	`deadline_at` integer,
	`submitted_at` integer,
	`status` text DEFAULT 'IN_PROGRESS' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `attempts_user_created_idx` ON `attempts` (`user_id`,`created_at`);
--> statement-breakpoint
CREATE INDEX `attempts_subject_created_idx` ON `attempts` (`subject_id`,`created_at`);
--> statement-breakpoint
CREATE INDEX `attempts_status_idx` ON `attempts` (`status`);
--> statement-breakpoint
CREATE TABLE `attempt_answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`attempt_id` text NOT NULL,
	`question_id` text,
	`prompt_snapshot` text NOT NULL,
	`options_snapshot` text NOT NULL,
	`correct_index` integer NOT NULL,
	`selected_index` integer,
	`is_correct` integer,
	`order_index` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`attempt_id`) REFERENCES `attempts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `attempt_answers_attempt_idx` ON `attempt_answers` (`attempt_id`);
--> statement-breakpoint
CREATE INDEX `attempt_answers_question_idx` ON `attempt_answers` (`question_id`);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`actor_id` text,
	`action` text NOT NULL,
	`entity_type` text,
	`entity_id` text,
	`metadata` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_logs_actor_idx` ON `audit_logs` (`actor_id`);
--> statement-breakpoint
CREATE INDEX `audit_logs_entity_idx` ON `audit_logs` (`entity_type`,`entity_id`);
--> statement-breakpoint
CREATE INDEX `audit_logs_created_idx` ON `audit_logs` (`created_at`);
