-- mobilespecific Hostinger MySQL schema
-- Import in hPanel → phpMyAdmin. Do not store hosting passwords in this file.

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(500),
  website_url VARCHAR(500),
  role ENUM('member','admin') NOT NULL DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS phones_catalog (
  id VARCHAR(64) PRIMARY KEY,
  brand VARCHAR(80) NOT NULL,
  name VARCHAR(160) NOT NULL,
  year SMALLINT NOT NULL,
  chipset VARCHAR(160) NOT NULL,
  silicon_vendor VARCHAR(80) NOT NULL,
  ram_gb SMALLINT NOT NULL,
  storage_gb SMALLINT NOT NULL,
  display VARCHAR(200) NOT NULL,
  peak_nits INT NOT NULL,
  battery_mah INT NOT NULL,
  battery_chemistry VARCHAR(80) NOT NULL,
  ip_rating VARCHAR(40) NOT NULL,
  periscope TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS laptops_catalog (
  id VARCHAR(64) PRIMARY KEY,
  brand VARCHAR(80) NOT NULL,
  name VARCHAR(160) NOT NULL,
  cpu VARCHAR(160) NOT NULL,
  npu_tops INT NOT NULL,
  ram_gb SMALLINT NOT NULL,
  peak_nits INT NOT NULL
);

CREATE TABLE IF NOT EXISTS watches_catalog (
  id VARCHAR(64) PRIMARY KEY,
  brand VARCHAR(80) NOT NULL,
  name VARCHAR(160) NOT NULL,
  water VARCHAR(160) NOT NULL,
  peak_nits INT NOT NULL,
  battery_days DECIMAL(4,1) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_favorites (
  user_id CHAR(36) NOT NULL,
  device_id VARCHAR(64) NOT NULL,
  PRIMARY KEY (user_id, device_id),
  CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_reviews (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  device_id VARCHAR(64) NOT NULL,
  body TEXT NOT NULL,
  verified TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rev_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
