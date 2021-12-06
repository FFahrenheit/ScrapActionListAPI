CREATE OR ALTER VIEW AllParts AS
SELECT number, area, department, location, name as client FROM client, part
WHERE client.id = part.client;

CREATE OR ALTER VIEW AllDepartments AS
SELECT id, department.name as name, manager, users.name as managerName 
FROM department, users
WHERE department.manager = users.username;