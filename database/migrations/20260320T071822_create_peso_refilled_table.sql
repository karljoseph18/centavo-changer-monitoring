CREATE TABLE peso_refilled(
	refill_id INT,
	peso_value INT,
	quantity INT,
	PRIMARY KEY(refill_id,peso_value),
	FOREIGN KEY (refill_id) REFERENCES refills(refill_id)
);