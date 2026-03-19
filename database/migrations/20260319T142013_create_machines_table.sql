CREATE TABLE machines (
	machine_id SERIAL PRIMARY KEY,
	location TEXT NOT NULL,
	status VARCHAR(100)
);