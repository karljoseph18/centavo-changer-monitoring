CREATE DATABASE centavo_changer_monitoring;

CREATE TABLE admin (
	admin_id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	hashed_password TEXT NOT NULL,
	account_name VARCHAR(25) NOT NULL
);

CREATE TABLE storage (
	storage_id SERIAL PRIMARY KEY,
	one DECIMAL(10, 2),
	five DECIMAL(10, 2),
	ten DECIMAL(10, 2),
	twenty DECIMAL(10, 2)
);

