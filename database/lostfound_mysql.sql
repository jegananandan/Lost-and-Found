-- =====================================================================
-- CAMPUS LOST & FOUND MANAGEMENT SYSTEM - MYSQL DATABASE SCHEMA & SEED DATA
-- Version: 1.0.0
-- Dialect: MySQL 8.0+ / MariaDB 10.5+
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `lost_found_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lost_found_db`;

-- ---------------------------------------------------------------------
-- Table structure for table `users`
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'USER',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table structure for table `items`
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `item_id` VARCHAR(50) NOT NULL UNIQUE,
  `type` VARCHAR(10) NOT NULL, -- 'LOST' or 'FOUND'
  `name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `reported_date` DATE NOT NULL,
  `reporter_name` VARCHAR(100) NOT NULL,
  `reporter_contact` VARCHAR(50) NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'CLAIMED', 'RESOLVED'
  `user_id` BIGINT,
  `image_url` LONGTEXT,
  `extra_field1` VARCHAR(255),
  `extra_field2` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_item_type` (`type`),
  KEY `idx_item_status` (`status`),
  KEY `idx_item_category` (`category`),
  KEY `idx_item_user` (`user_id`),
  CONSTRAINT `fk_items_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table structure for table `claims`
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `claims`;
CREATE TABLE `claims` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `claim_id` VARCHAR(50) NOT NULL UNIQUE,
  `item_id` VARCHAR(50) NOT NULL,
  `claimer_id` BIGINT,
  `claimer_name` VARCHAR(100) NOT NULL,
  `claimer_contact` VARCHAR(50) NOT NULL,
  `proof_details` TEXT NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'REJECTED'
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `review_note` TEXT,
  PRIMARY KEY (`id`),
  KEY `idx_claims_item` (`item_id`),
  KEY `idx_claims_user` (`claimer_id`),
  CONSTRAINT `fk_claims_user` FOREIGN KEY (`claimer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Seed Demo Accounts (BCrypt hashed passwords)
-- jegan123: $2a$10$wO5Q4d3y0Uu7iH4bM.k2Ce5Wz8Pq6fF0u1yVb3.N7t6sV2k8pG8i2
-- Nandha@2007: $2a$10$o1fQ3iG9rE0u5wA2.m6BqOF2i9j5kL4l8zX1cV7b6m9a4s2d1f
-- student123: $2a$10$s7vU1k9mP4w2t5.j6v9CeOR7s1u3b4x2k8l6m9a4s2d1f5e8r
-- Note: When running Spring Boot, DataInitializer will automatically generate these hashes!
-- ---------------------------------------------------------------------
