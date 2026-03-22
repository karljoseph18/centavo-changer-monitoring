ALTER TABLE machine_storage
ADD CONSTRAINT fk_machine_id_peso_value
FOREIGN KEY (machine_id) 
REFERENCES machines(machine_id);