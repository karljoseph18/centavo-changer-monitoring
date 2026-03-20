CREATE TABLE refills (
	refill_id SERIAL PRIMARY KEY,
	machine_id INT,
	refill_date_time TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (machine_id) REFERENCES machines(machine_id)
);