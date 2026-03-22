CREATE OR REPLACE FUNCTION dispense_machine_storage()
RETURNS TRIGGER AS $$
DECLARE
	m_id INT;
BEGIN
	-- get machine_id first
	SELECT machine_id INTO m_id
	FROM transactions
	WHERE transaction_id = NEW.transaction_id;
	
	UPDATE machine_storage
	SET quantity = machine_storage.quantity - NEW.quantity
	WHERE machine_id = m_id AND peso_value = NEW.peso_value;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;