CREATE TABLE `bets` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`odd_id` int NOT NULL,
	`stake` decimal(12,2) NOT NULL,
	`potential_payout` decimal(12,2) NOT NULL,
	`status` enum('pending','won','lost') NOT NULL DEFAULT 'pending',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`start_time` datetime NOT NULL,
	`status` enum('upcoming','finished') NOT NULL DEFAULT 'upcoming',
	`category` varchar(100),
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `odds` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`event_id` int NOT NULL,
	`description` varchar(255) NOT NULL,
	`odd_value` decimal(8,2) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `odds_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`type` enum('deposit','withdraw') NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password_hash` varchar(191) NOT NULL,
	`balance` decimal(12,2) NOT NULL DEFAULT '0.00',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `bets_user_id_idx` ON `bets` (`user_id`);--> statement-breakpoint
CREATE INDEX `bets_odd_id_idx` ON `bets` (`odd_id`);--> statement-breakpoint
CREATE INDEX `odds_event_id_idx` ON `odds` (`event_id`);--> statement-breakpoint
CREATE INDEX `transactions_user_id_idx` ON `transactions` (`user_id`);