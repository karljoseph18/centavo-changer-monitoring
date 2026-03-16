CREATE TABLE refills (
	refill_id SERIAL PRIMARY KEY,
	refill_date TIMESTAMP DEFAULT NOW(),
	one INT,
	five INT,
	ten INT,
	twenty INT
);

CREATE TABLE transactions (
	transaction_id SERIAL PRIMARY KEY,
	transaction_date TIMESTAMP NOT NULL,
	centavo_inserted DECIMAL(10, 2) NOT NULL,
	one INT,
	five INT,
	ten INT,
	twenty INT
);