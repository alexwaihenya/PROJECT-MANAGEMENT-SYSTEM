CREATE PROCEDURE deleteProjects(@projectId INT)
AS
BEGIN
SELECT * FROM ProjectManagement 
WHERE projectId = @projectId
END