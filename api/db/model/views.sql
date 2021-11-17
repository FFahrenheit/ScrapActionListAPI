CREATE OR ALTER VIEW AllParts AS
SELECT number, area, department, location, name FROM client, part
WHERE client.id = part.client;