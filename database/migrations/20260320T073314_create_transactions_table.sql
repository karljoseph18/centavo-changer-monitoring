CREATE TABLE transactions(
	transaction_id SERIAL PRIMARY KEY,
	machine_id INT,
	transaction_date_time TIMESTAMP DEFAULT NOW(),
	centavos_25_inserted INT,
	total_value DECIMAL(10,2),
	FOREIGN KEY (machine_id) REFERENCES machines(machine_id)
);