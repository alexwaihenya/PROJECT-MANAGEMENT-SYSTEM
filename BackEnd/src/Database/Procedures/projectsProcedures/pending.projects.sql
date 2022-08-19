CREATE PROCEDURE pendingProjects 
AS
BEGIN
	SELECT id,project_name,project_desc,project_timeline,user_id FROM dbo.PROJECTS WHERE project_status=0
END