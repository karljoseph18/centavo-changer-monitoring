CREATE TRIGGER dispense_machine_storage
AFTER INSERT 
ON peso_dispensed
FOR EACH ROW
EXECUTE FUNCTION dispense_machine_storage();