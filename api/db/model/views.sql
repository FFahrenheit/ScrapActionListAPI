CREATE OR ALTER VIEW AllParts AS
SELECT number, area, department, location, name as client FROM client, part
WHERE client.id = part.client;

CREATE OR ALTER VIEW AllDepartments AS
SELECT id, department.name as name, manager, users.name as managerName 
FROM department, users
WHERE department.manager = users.username;

CREATE OR ALTER VIEW AllIssues AS
SELECT 
issue.id, type, phase, status, issue.description, part.area,
username,
issue.d0 AS created,
problem.description AS problem, 
part.number AS part,
client.name AS client,
users.name AS originator,
COALESCE(d8,d7,d6,d5,d4,d3,d2,d1,d0) AS lastUpdated
FROM issue, problem, part, client, users
WHERE problem.id = issue.problem
AND part.number = issue.part
AND part.client = client.id
AND users.username = issue.originator;

CREATE OR ALTER VIEW ActionDetails AS
SELECT action.id, action.description, action.type, action.status,  
evaluation, due, closed, department, justification, responsible, users.name as responsibleName,
department.name as departmentName, issue.id as issueId, issue.status as issueStatus, 
issue.type as issueType, issue.client, issue.originator, issue.phase, issue.part
FROM action, department, AllIssues as issue, users
WHERE action.department = department.id
AND issue.id = action.issue
AND users.username = action.responsible;