CREATE OR REPLACE FUNCTION update_machine_storage()
RETURNS TRIGGER AS $$
DECLARE
	m_id INT;
BEGIN
	-- get the machine_id first
	SELECT machine_id INTO m_id 
	FROM refills
	WHERE refill_id = NEW.refill_id;
	
	INSERT INTO machine_storage (machine_id, peso_value, quantity)
	VALUES (m_id, NEW.peso_value, NEW.quantity)
	ON CONFLICT (machine_id, peso_value)
	DO UPDATE
	SET quantity = machine_storage.quantity + EXCLUDED.quantity;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;