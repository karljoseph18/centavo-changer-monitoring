CREATE TRIGGER trigger_update_machine_storage
AFTER INSERT
ON peso_refilled
FOR EACH ROW
EXECUTE FUNCTION update_machine_storage();