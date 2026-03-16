CREATE TABLE admins (
	admin_id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	hashed_password TEXT NOT NULL,
	account_name VARCHAR(25) NOT NULL
);