CREATE TABLE peso_dispensed (
	transaction_id INT,
	peso_value INT,
	quantity INT,
	PRIMARY KEY(transaction_id, peso_value),
	FOREIGN KEY(transaction_id) REFERENCES transactions(transaction_id)
);